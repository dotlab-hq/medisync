import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/server/user'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Key } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/dashboard/developer')({
  component: DeveloperPage,
})

function DeveloperPage() {
  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(),
    enabled: !import.meta.env.SSR,
    retry: false,
  })

  return (
    <div className="space-y-6">
      <h1 className="animate-fade-in-up text-2xl font-bold">Developer</h1>

      <Card className="animate-fade-in-up stagger-1 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Account Info
          </CardTitle>
          <CardDescription>
            Technical details about your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">User ID</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {profile?.id ?? '—'}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm">{profile?.email ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Email Verified
            </span>
            <Badge variant={profile?.emailVerified ? 'default' : 'destructive'}>
              {profile?.emailVerified ? 'Verified' : 'Not verified'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Onboarding Complete
            </span>
            <Badge
              variant={profile?.onboardingCompleted ? 'default' : 'secondary'}
            >
              {profile?.onboardingCompleted ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="text-sm">
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleString()
                : '—'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
