import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield, Users, Globe } from 'lucide-react'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/_public/about')({
  component: About,
})

function About() {
  const cards = [
    {
      icon: Heart,
      title: m.about_mission_title(),
      desc: m.about_mission_desc(),
    },
    {
      icon: Shield,
      title: m.about_privacy_title(),
      desc: m.about_privacy_desc(),
    },
    { icon: Users, title: m.about_open_title(), desc: m.about_open_desc() },
    {
      icon: Globe,
      title: m.about_accessible_title(),
      desc: m.about_accessible_desc(),
    },
  ]

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-4 py-12">
      <section className="animate-fade-in-up text-center">
        <h1 className="mb-4 text-4xl font-bold">{m.about_title()}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {m.about_subtitle()}
        </p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        {cards.map(({ icon: Icon, title, desc }, idx) => (
          <Card
            key={title}
            className={`animate-fade-in-up stagger-${idx + 1} border-border/50 transition-all hover:shadow-lg`}
          >
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
