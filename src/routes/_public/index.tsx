import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Shield,
  QrCode,
  Bell,
  FileText,
  Activity,
  Heart,
} from 'lucide-react'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute( '/_public/' )( { component: HomePage } )

function getFeatures() {
  return [
    {
      icon: QrCode,
      title: m.feature_qr_title(),
      description: m.feature_qr_desc(),
    },
    {
      icon: FileText,
      title: m.feature_records_title(),
      description: m.feature_records_desc(),
    },
    {
      icon: Bell,
      title: m.feature_reminders_title(),
      description: m.feature_reminders_desc(),
    },
    {
      icon: Activity,
      title: m.feature_health_title(),
      description: m.feature_health_desc(),
    },
    {
      icon: Shield,
      title: m.feature_contacts_title(),
      description: m.feature_contacts_desc(),
    },
    {
      icon: Heart,
      title: m.feature_multilang_title(),
      description: m.feature_multilang_desc(),
    },
  ]
}

function HomePage() {
  const features = getFeatures()

  return (
    <main className="px-4 pb-16 pt-10">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center py-16">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
          {m.hero_title()}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {m.hero_subtitle()}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/auth/signup">{m.hero_cta()}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/about">{m.hero_learn()}</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map( ( { icon: Icon, title, description } ) => (
            <Card key={title} className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ) )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          {m.cta_title()}
        </h2>
        <p className="text-muted-foreground mb-6">
          {m.cta_subtitle()}
        </p>
        <Button size="lg" asChild>
          <Link to="/auth/signup">{m.cta_button()}</Link>
        </Button>
      </section>
    </main>
  )
}
