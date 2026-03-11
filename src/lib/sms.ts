/**
 * SMS service stub.
 * Replace the console.log with an actual SMS provider (Twilio, MSG91, etc.)
 * when ready to go to production.
 */
import { RelayX } from '@dotlab-hq/relayx-js'

const relayx = new RelayX()

export async function sendSms(
  phone: string,
  message: string,
): Promise<boolean> {
  console.log(`Sending SMS to ${phone}: ${message}`)
  await relayx.sendSMS({
    phoneNumber: phone,
    message,
  })
  console.log(`[SMS STUB] To: ${phone} | Message: ${message}`)
  return true
}
