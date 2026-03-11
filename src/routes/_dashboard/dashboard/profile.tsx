import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { getUserProfile, updateUser, upsertAddress } from '@/server/user'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { MedicalInfoForm } from '@/components/dashboard/MedicalInfoForm'
import { EmergencyContactsManager } from '@/components/dashboard/EmergencyContactsManager'
import { ChangePhoneDialog } from '@/components/dashboard/ChangePhoneDialog'
import {
  AvatarSection,
  PersonalInfoCard,
  AddressCard,
} from '@/components/dashboard/ProfileFormCards'

export const Route = createFileRoute('/_dashboard/dashboard/profile')({
  component: ProfilePage,
})

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-28 w-full rounded-xl" />
      <Skeleton className="h-10 w-80" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}

function ProfilePage() {
  const queryClient = useQueryClient()
  const { data: profile, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
    enabled: !import.meta.env.SSR,
    retry: false,
  })

  const [success, setSuccess] = useState('')
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false)

  const updateMut = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      setSuccess('Profile updated')
      setTimeout(() => setSuccess(''), 3000)
    },
  })

  const addressMut = useMutation({
    mutationFn: upsertAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      setSuccess('Address updated')
      setTimeout(() => setSuccess(''), 3000)
    },
  })

  if (isLoading) return <ProfileSkeleton />

  const handlePersonal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    updateMut.mutate({
      data: {
        name: fd.get('name') as string,
        gender: (fd.get('gender') as string) || undefined,
        dateOfBirth: (fd.get('dateOfBirth') as string) || undefined,
        bloodGroup: (fd.get('bloodGroup') as string) || undefined,
        timezone: (fd.get('timezone') as string) || undefined,
      },
    })
  }

  const handleAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    addressMut.mutate({
      data: {
        address: fd.get('address') as string,
        city: fd.get('city') as string,
        state: fd.get('state') as string,
        pinCode: fd.get('pinCode') as string,
      },
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="animate-fade-in-up text-2xl font-bold">Profile</h1>

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <AvatarSection
        imageUrl={profile?.image ?? ''}
        isPending={updateMut.isPending}
        onSave={(url) => updateMut.mutate({ data: { image: url } })}
      />

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="medical">Medical Info</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoCard
            profile={profile}
            isPending={updateMut.isPending}
            onSubmit={handlePersonal}
            onPhoneChange={() => setPhoneDialogOpen(true)}
          />
        </TabsContent>
        <TabsContent value="address">
          <AddressCard
            profile={profile}
            isPending={addressMut.isPending}
            onSubmit={handleAddress}
          />
        </TabsContent>
        <TabsContent value="medical">
          <MedicalInfoForm />
        </TabsContent>
        <TabsContent value="emergency">
          <EmergencyContactsManager />
        </TabsContent>
      </Tabs>

      <ChangePhoneDialog
        open={phoneDialogOpen}
        currentPhone={profile?.phone ?? ''}
        onOpenChange={setPhoneDialogOpen}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['userProfile'] })
          setSuccess('Phone number updated')
          setTimeout(() => setSuccess(''), 3000)
        }}
      />
    </div>
  )
}
