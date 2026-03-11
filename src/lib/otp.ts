import { createHash, randomBytes } from 'crypto'
import { sendSms } from './sms'
import { db } from '@/db'
import { otpVerification } from '@/db/schema'
import { eq, lt } from 'drizzle-orm'

const OTP_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/** SHA-256 hash of `salt:code` — never stores the raw OTP */
function hashOtp(salt: string, code: string): string {
  return createHash('sha256').update(`${salt}:${code}`).digest('hex')
}

/**
 * Generate a 6-digit OTP, hash it with a random salt, persist to DB, then send via SMS.
 */
export async function generateOtp(
  phone: string,
): Promise<{ success: boolean }> {
  // Purge expired + existing entries for this phone first
  await db.delete(otpVerification).where(eq(otpVerification.phone, phone))

  const code = generateCode()
  const salt = randomBytes(16).toString('hex')
  const saltedHash = `${salt}:${hashOtp(salt, code)}`
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS)

  await db.insert(otpVerification).values({ phone, saltedHash, expiresAt })

  const sent = await sendSms(
    phone,
    `Your MediSync verification code is: ${code}`,
  )
  return { success: sent }
}

/**
 * Verify the OTP for the given phone number.
 * Deletes the record on success or expiry.
 */
export async function verifyOtp(
  phone: string,
  code: string,
): Promise<{ valid: boolean; message: string }> {
  // Clean up any globally expired rows opportunistically
  await db
    .delete(otpVerification)
    .where(lt(otpVerification.expiresAt, new Date()))

  const entry = await db.query.otpVerification.findFirst({
    where: eq(otpVerification.phone, phone),
  })

  if (!entry) {
    return { valid: false, message: 'No OTP found. Please request a new one.' }
  }

  if (new Date() > entry.expiresAt) {
    await db.delete(otpVerification).where(eq(otpVerification.phone, phone))
    return {
      valid: false,
      message: 'OTP has expired. Please request a new one.',
    }
  }

  const [salt, storedHash] = entry.saltedHash.split(':')
  const candidate = hashOtp(salt, code)

  if (candidate !== storedHash) {
    return { valid: false, message: 'Invalid OTP. Please try again.' }
  }

  await db.delete(otpVerification).where(eq(otpVerification.phone, phone))
  return { valid: true, message: 'Phone number verified successfully.' }
}
