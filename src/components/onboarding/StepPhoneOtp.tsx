import { useState } from 'react'
import { sendOtp } from '@/server/phone-auth'
import { verifyPhoneOtp } from '@/server/phone-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Phone, CheckCircle, Loader2, RefreshCw } from 'lucide-react'

interface Props {
  phone: string
  onVerified: () => void
  onBack: () => void
}

type OtpState = 'idle' | 'sending' | 'waiting' | 'verifying' | 'done'

export function StepPhoneOtp({ phone, onVerified, onBack }: Props) {
  const [state, setState] = useState<OtpState>('idle')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSend() {
    setError('')
    setSuccess('')
    setState('sending')
    try {
      const res = await sendOtp({ data: { phone } })
      if (res.success) {
        setState('waiting')
        setSuccess(`OTP sent to ${phone}`)
      } else {
        setError('Failed to send OTP. Please try again.')
        setState('idle')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send OTP')
      setState('idle')
    }
  }

  async function handleVerify() {
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP')
      return
    }
    setError('')
    setState('verifying')
    try {
      const res = await verifyPhoneOtp({ data: { phone, code: otp } })
      if (res.valid) {
        setState('done')
        setSuccess(res.message)
      } else {
        setError(res.message)
        setState('waiting')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Verification failed')
      setState('waiting')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
        <Phone className="h-5 w-5 text-primary shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">
            Verifying phone number
          </p>
          <p className="font-semibold">{phone}</p>
        </div>
        {state === 'done' && (
          <Badge variant="secondary" className="ml-auto gap-1 text-green-600">
            <CheckCircle className="h-3 w-3" /> Verified
          </Badge>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && state !== 'done' && (
        <Alert>
          <AlertDescription className="text-green-700">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {state === 'idle' && (
        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            We'll send a 6-digit code to verify your number.
          </p>
          <Button onClick={handleSend} className="w-full">
            Send OTP
          </Button>
        </div>
      )}

      {state === 'sending' && (
        <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending OTP…
        </div>
      )}

      {(state === 'waiting' || state === 'verifying') && (
        <div className="space-y-3">
          <Label htmlFor="otp-input">Enter 6-digit OTP</Label>
          <Input
            id="otp-input"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="______"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="text-center text-2xl tracking-[0.5em] font-mono"
            disabled={state === 'verifying'}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSend}
              disabled={state === 'verifying'}
              className="gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Resend
            </Button>
            <Button
              className="flex-1"
              onClick={handleVerify}
              disabled={state === 'verifying' || otp.length !== 6}
            >
              {state === 'verifying' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Verifying…
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </div>
        </div>
      )}

      {state === 'done' && (
        <Alert>
          <AlertDescription className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-4 w-4" />
            {success || 'Phone number verified successfully.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onVerified} disabled={state !== 'done'}>
          Continue
        </Button>
      </div>
    </div>
  )
}
