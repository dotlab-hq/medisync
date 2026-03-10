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

export const Route = createFileRoute('/_public/')({ component: HomePage })

function getFeatures() {
  return [
    { icon: QrCode, title: m.feature_qr_title(), description: m.feature_qr_desc() },
    { icon: FileText, title: m.feature_records_title(), description: m.feature_records_desc() },
    { icon: Bell, title: m.feature_reminders_title(), description: m.feature_reminders_desc() },
    { icon: Activity, title: m.feature_health_title(), description: m.feature_health_desc() },
    { icon: Shield, title: m.feature_contacts_title(), description: m.feature_contacts_desc() },
    { icon: Heart, title: m.feature_multilang_title(), description: m.feature_multilang_desc() },
  ]
}

function HomePage() {
  const features = getFeatures()

  return (
    <main className="px-4 pb-16 pt-10">
      {/* Hero */}
      <section className="animate-fade-in-up mx-auto max-w-4xl py-16 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          {m.hero_title()}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
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
          {features.map(({ icon: Icon, title, description }, idx) => (
            <Card
              key={title}
              className={`animate-fade-in-up stagger-${idx + 1} border-border/50 transition-all hover:border-primary/50 hover:shadow-lg`}
            >
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="animate-fade-in-up stagger-5 mx-auto max-w-2xl py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">{m.cta_title()}</h2>
        <p className="mb-6 text-muted-foreground">{m.cta_subtitle()}</p>
        <Button size="lg" asChild>
          <Link to="/auth/signup">{m.cta_button()}</Link>
        </Button>
      </section>
    </main>
  )
}
