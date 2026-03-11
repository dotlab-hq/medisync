import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { generateOtp, verifyOtp } from '@/lib/otp'

// ── Send OTP ─────────────────────────────────────────────────────────
export const sendOtp = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) =>
    z.object({ phone: z.string().min(10) }).parse(data),
  )
  .handler(async ({ data }) => {
    return generateOtp(data.phone)
  })

// ── Verify OTP ───────────────────────────────────────────────────────
export const verifyPhoneOtp = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) =>
    z
      .object({ phone: z.string().min(10), code: z.string().length(6) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    return await verifyOtp(data.phone, data.code)
  })
