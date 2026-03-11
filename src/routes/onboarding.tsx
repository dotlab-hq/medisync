import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { getSession } from '@/server/auth'
import { submitOnboarding } from '@/server/onboarding'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { StepPersonal } from '@/components/onboarding/StepPersonal'
import { StepPhoneOtp } from '@/components/onboarding/StepPhoneOtp'
import { StepAddress } from '@/components/onboarding/StepAddress'
import { StepMedical } from '@/components/onboarding/StepMedical'
import { StepEmergency } from '@/components/onboarding/StepEmergency'
import type { StepPersonalData } from '@/components/onboarding/StepPersonal'
import type { StepAddressData } from '@/components/onboarding/StepAddress'
import type { StepMedicalData } from '@/components/onboarding/StepMedical'
import type { StepEmergencyData } from '@/components/onboarding/StepEmergency'

export const Route = createFileRoute('/onboarding')({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session?.user) throw redirect({ to: '/auth/login' })
    return { session }
  },
  component: OnboardingPage,
})

const STEPS = [
  'Personal Info',
  'Verify Phone',
  'Address',
  'Medical Info',
  'Emergency Contact',
]

interface CollectedData {
  personal?: StepPersonalData
  address?: StepAddressData
  medical?: StepMedicalData
}

function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CollectedData>({})

  const totalSteps = STEPS.length
  const progress = ((step + 1) / totalSteps) * 100

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1))
  const back = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  function handlePersonalNext(personal: StepPersonalData) {
    setData((d) => ({ ...d, personal }))
    next()
  }

  function handleAddressNext(address: StepAddressData) {
    setData((d) => ({ ...d, address }))
    next()
  }

  function handleMedicalNext(medical: StepMedicalData) {
    setData((d) => ({ ...d, medical }))
    next()
  }

  async function handleEmergencyNext(emergency: StepEmergencyData) {
    if (!data.personal || !data.address || !data.medical) {
      setError('Missing required data. Please go back and fill all steps.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await submitOnboarding({
        data: {
          ...data.personal,
          ...data.address,
          ...data.medical,
          ...emergency,
        },
      })
      navigate({ to: '/dashboard' })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>
          <CardDescription>
            Step {step + 1} of {totalSteps} — {STEPS[step]}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 0 && (
            <StepPersonal
              defaultValues={data.personal ?? {}}
              onNext={handlePersonalNext}
            />
          )}
          {step === 1 && data.personal && (
            <StepPhoneOtp
              phone={data.personal.phone}
              onVerified={next}
              onBack={back}
            />
          )}
          {step === 2 && (
            <StepAddress
              defaultValues={data.address ?? {}}
              onNext={handleAddressNext}
              onBack={back}
            />
          )}
          {step === 3 && (
            <StepMedical
              defaultValues={data.medical ?? {}}
              onNext={handleMedicalNext}
              onBack={back}
            />
          )}
          {step === 4 && (
            <StepEmergency
              defaultValues={{}}
              onNext={handleEmergencyNext}
              onBack={back}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
