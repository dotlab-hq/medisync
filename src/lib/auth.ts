import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import * as schema from '@/db/schema'
import {
  detectLocale,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
} from '@/lib/email'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }, request) => {
      const locale = detectLocale(request)
      await sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        url,
        locale,
      })
    },
    onPasswordReset: async ({ user }, request) => {
      const locale = detectLocale(request)
      await sendPasswordChangedEmail({
        to: user.email,
        name: user.name,
        locale,
      })
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
    sendVerificationEmail: async ({ user, url }, request) => {
      const locale = detectLocale(request)
      await sendVerificationEmail({
        to: user.email,
        name: user.name,
        url,
        locale,
      })
    },
  },

  plugins: [tanstackStartCookies()],
})
