import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Mail, MessageSquare, FileText } from 'lucide-react'
import { m } from '@/paraglide/messages'

export const Route = createFileRoute('/_public/help')({
  component: HelpPage,
})

function HelpPage() {
  const faqs = [
    {
      icon: HelpCircle,
      title: 'How do I generate a QR code?',
      body: 'After completing your profile, go to Dashboard → QR Code. Your emergency QR code is generated automatically and can be shared or printed.',
    },
    {
      icon: FileText,
      title: 'Are my documents secure?',
      body: 'Yes. Documents marked as confidential are never shown on the public emergency page. Only you can access them from your dashboard.',
    },
    {
      icon: MessageSquare,
      title: 'How do emergency contacts work?',
      body: 'Your emergency contacts are displayed on your public QR page with a click-to-call button so responders can reach them immediately.',
    },
  ]

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <section className="animate-fade-in-up text-center">
        <h1 className="mb-4 text-4xl font-bold">{m.help_title()}</h1>
        <p className="text-lg text-muted-foreground">{m.help_subtitle()}</p>
      </section>

      <div className="grid gap-6 sm:grid-cols-2">
        {faqs.map(({ icon: Icon, title, body }, idx) => (
          <Card
            key={title}
            className={`animate-fade-in-up stagger-${idx + 1} border-border/50 transition-all hover:shadow-lg`}
          >
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </CardContent>
          </Card>
        ))}

        <Card className="animate-fade-in-up stagger-4 border-border/50 transition-all hover:shadow-lg">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base">Need more help?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground">
            Reach out to us at{' '}
            <a
              href="mailto:support@medisync.app"
              className="text-primary hover:underline"
            >
              support@medisync.app
            </a>
            . We respond within 24 hours.
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
