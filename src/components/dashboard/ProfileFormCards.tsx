import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GENDER_LABELS, BLOOD_GROUP_LABELS } from '@/types'
import { getTimezoneOptions } from '@/lib/timezones'
import { Pencil, User } from 'lucide-react'
import { useState } from 'react'

interface ProfileData {
  name?: string | null
  phone?: string | null
  gender?: string | null
  dateOfBirth?: string | Date | null
  bloodGroup?: string | null
  timezone?: string | null
  image?: string | null
  addressDetails?: {
    address?: string | null
    city?: string | null
    state?: string | null
    pinCode?: string | null
  } | null
}

export function AvatarSection({
  imageUrl,
  onSave,
  isPending,
}: {
  imageUrl: string
  onSave: (url: string) => void
  isPending: boolean
}) {
  const [url, setUrl] = useState(imageUrl)

  return (
    <Card className="animate-fade-in-up border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Profile Avatar
        </CardTitle>
        <CardDescription>Enter a URL for your profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
            {url ? (
              <img
                src={url}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-primary" />
            )}
          </div>
          <div className="flex flex-1 gap-2">
            <Input
              placeholder="https://example.com/avatar.png"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              size="sm"
              disabled={isPending || url === imageUrl}
              onClick={() => onSave(url)}
            >
              {isPending ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PersonalInfoCard({
  profile,
  isPending,
  onSubmit,
  onPhoneChange,
}: {
  profile: ProfileData | null | undefined
  isPending: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onPhoneChange: () => void
}) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your basic details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={profile?.name ?? ''} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={profile?.phone ?? 'Not set'}
                  disabled
                  className="flex-1 bg-muted"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onPhoneChange}
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  Change
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select name="gender" defaultValue={profile?.gender ?? ''}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(GENDER_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                defaultValue={
                  profile?.dateOfBirth
                    ? new Date(
                        profile.dateOfBirth instanceof Date
                          ? profile.dateOfBirth.toISOString()
                          : String(profile.dateOfBirth),
                      )
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select
                name="bloodGroup"
                defaultValue={profile?.bloodGroup ?? ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BLOOD_GROUP_LABELS).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select name="timezone" defaultValue={profile?.timezone ?? 'UTC'}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {getTimezoneOptions().map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving…' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export function AddressCard({
  profile,
  isPending,
  onSubmit,
}: {
  profile: ProfileData | null | undefined
  isPending: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) {
  const addr = profile?.addressDetails
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Your residential details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={addr?.address ?? ''}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue={addr?.city ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" defaultValue={addr?.state ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN Code</Label>
              <Input
                id="pinCode"
                name="pinCode"
                defaultValue={addr?.pinCode ?? ''}
              />
            </div>
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving…' : 'Save Address'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
