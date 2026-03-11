import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { getUserProfile, upsertMedicalInfo } from '@/server/user'
import { useState } from 'react'
import { HeartPulse } from 'lucide-react'

const medicalInfoSchema = z.object({
  allergies: z.string(),
  chronicConditions: z.string(),
  currentMedications: z.string(),
})

type MedicalInfoFormValues = z.infer<typeof medicalInfoSchema>

export function MedicalInfoForm() {
  const queryClient = useQueryClient()
  const [saved, setSaved] = useState(false)

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
    enabled: !import.meta.env.SSR,
    retry: false,
  })

  const form = useForm<MedicalInfoFormValues>({
    resolver: zodResolver(medicalInfoSchema),
    values: {
      allergies: profile?.medicalInformation?.allergies ?? '',
      chronicConditions: profile?.medicalInformation?.chronicConditions ?? '',
      currentMedications: profile?.medicalInformation?.currentMedications ?? '',
    },
  })

  const mut = useMutation({
    mutationFn: upsertMedicalInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    },
  })

  const onSubmit = (values: MedicalInfoFormValues) => {
    mut.mutate({ data: values })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-primary" />
          Medical Information
        </CardTitle>
        <CardDescription>
          Keep your medical details up to date for emergency access
        </CardDescription>
      </CardHeader>
      <CardContent>
        {saved && (
          <Alert className="mb-4">
            <AlertDescription>
              Medical information saved successfully.
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Penicillin, Peanuts, Latex..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each allergy on a new line or comma-separated
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chronicConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chronic Conditions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Type 2 Diabetes, Hypertension..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each condition on a new line or comma-separated
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currentMedications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Metformin 500mg (twice daily)..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include dosage and frequency if known
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mut.isPending}>
              {mut.isPending ? 'Saving…' : 'Save Medical Info'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
