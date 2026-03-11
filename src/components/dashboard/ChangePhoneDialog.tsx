import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import { useMutation } from '@tanstack/react-query'
import { Phone, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { sendPhoneChangeOtp, verifyAndUpdatePhone } from '@/server/phone-update'

// ── Schemas ──────────────────────────────────────────────────────────
const phoneSchema = z.object({
  newPhone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^\+?[\d\s\-()\s]{10,15}$/, 'Invalid phone format'),
})

const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'Digits only'),
})

type PhoneForm = z.infer<typeof phoneSchema>
type OtpForm = z.infer<typeof otpSchema>

// ── Props ─────────────────────────────────────────────────────────────
interface ChangePhoneDialogProps {
  open: boolean
  currentPhone: string
  onOpenChange: (open: boolean) => void
  onSuccess: (newPhone: string) => void
}

type Step = 'enter-phone' | 'enter-otp' | 'done'

export function ChangePhoneDialog({
  open,
  currentPhone,
  onOpenChange,
  onSuccess,
}: ChangePhoneDialogProps) {
  const [step, setStep] = useState<Step>('enter-phone')
  const [pendingPhone, setPendingPhone] = useState('')
  const [apiError, setApiError] = useState('')

  const phoneForm = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { newPhone: '' },
  })

  const otpForm = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  })

  const sendOtpMut = useMutation({
    mutationFn: (data: PhoneForm) =>
      sendPhoneChangeOtp({ data: { newPhone: data.newPhone } }),
    onSuccess: (_, variables) => {
      setPendingPhone(variables.newPhone)
      setApiError('')
      setStep('enter-otp')
    },
    onError: (err: Error) => setApiError(err.message),
  })

  const verifyMut = useMutation({
    mutationFn: (data: OtpForm) =>
      verifyAndUpdatePhone({
        data: { newPhone: pendingPhone, code: data.code },
      }),
    onSuccess: () => {
      setApiError('')
      setStep('done')
      onSuccess(pendingPhone)
    },
    onError: (err: Error) => setApiError(err.message),
  })

  function handleClose(isOpen: boolean) {
    if (!isOpen) {
      // reset state on close
      setStep('enter-phone')
      setPendingPhone('')
      setApiError('')
      phoneForm.reset()
      otpForm.reset()
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Change Phone Number
          </DialogTitle>
          <DialogDescription>
            {step === 'enter-phone' && (
              <>
                Current:{' '}
                <span className="font-medium">{currentPhone || 'Not set'}</span>
              </>
            )}
            {step === 'enter-otp' && `Enter the OTP sent to ${pendingPhone}`}
            {step === 'done' && 'Phone number updated successfully'}
          </DialogDescription>
        </DialogHeader>

        {apiError && (
          <Alert variant="destructive">
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        {/* ── Step 1: Enter new phone ─────────────────────────── */}
        {step === 'enter-phone' && (
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit((d) => sendOtpMut.mutate(d))}
              className="space-y-4"
            >
              <FormField
                control={phoneForm.control}
                name="newPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+91 XXXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={sendOtpMut.isPending}>
                  {sendOtpMut.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP…
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* ── Step 2: Enter OTP ───────────────────────────────── */}
        {step === 'enter-otp' && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit((d) => verifyMut.mutate(d))}
              className="space-y-4"
            >
              <FormField
                control={otpForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>6-Digit OTP</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="______"
                        className="tracking-[0.5em] text-center text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStep('enter-phone')
                    setApiError('')
                  }}
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={sendOtpMut.isPending}
                    onClick={() =>
                      sendOtpMut.mutate({ newPhone: pendingPhone })
                    }
                  >
                    {sendOtpMut.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Resend OTP'
                    )}
                  </Button>
                  <Button type="submit" disabled={verifyMut.isPending}>
                    {verifyMut.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      'Verify & Update'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}

        {/* ── Step 3: Done ─────────────────────────────────────── */}
        {step === 'done' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-center text-sm text-muted-foreground">
              Your phone number has been updated to{' '}
              <span className="font-semibold text-foreground">
                {pendingPhone}
              </span>
              .
            </p>
            <Button onClick={() => handleClose(false)}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
