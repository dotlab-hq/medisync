import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Heart, Shield, Users, Globe } from 'lucide-react'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute( '/_public/about' )( {
  component: About,
} )

function About() {
  return (
    <main className="px-4 py-12 max-w-4xl mx-auto space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">{m.about_title()}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {m.about_subtitle()}
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Heart className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{m.about_mission_title()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {m.about_mission_desc()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{m.about_privacy_title()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {m.about_privacy_desc()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{m.about_open_title()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {m.about_open_desc()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Globe className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{m.about_accessible_title()}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            {m.about_accessible_desc()}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
