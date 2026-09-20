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
  ArrowRight,
} from 'lucide-react'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/_public/')({ component: HomePage })

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
  const features = getFeatures().slice(0, 3)

  return (
    <main className="overflow-hidden px-4 pb-16">
      {/* Hero */}
      <section className="animate-fade-in-up relative mx-auto max-w-5xl pb-14 pt-24 text-center sm:pb-16 sm:pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-12 -z-10 mx-auto h-80 max-w-4xl bg-[radial-gradient(ellipse_at_center,var(--accent),transparent_68%)] opacity-70" />
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {m.hero_title()}
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-xl">
          {m.hero_subtitle()}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/auth/signup">
              {m.hero_cta()}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/about">{m.hero_learn()}</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl pb-10">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, idx) => (
            <Card
              key={title}
              className={`animate-fade-in-up stagger-${idx + 1} group bg-card/55 text-center hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg`}
            >
              <CardHeader className="justify-items-center text-center">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted ring-1 ring-border transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="surface-glass animate-fade-in-up stagger-5 mx-auto mt-24 max-w-3xl rounded-md px-6 py-12 text-center sm:px-12">
        <h2 className="mb-4 text-3xl font-bold">{m.cta_title()}</h2>
        <p className="mb-6 text-muted-foreground">{m.cta_subtitle()}</p>
        <Button size="lg" asChild>
          <Link to="/auth/signup">{m.cta_button()}</Link>
        </Button>
      </section>
    </main>
  )
}
