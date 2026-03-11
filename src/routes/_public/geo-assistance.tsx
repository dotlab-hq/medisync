import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { lazy, Suspense } from 'react'
import { MapPin, Phone, Hospital } from 'lucide-react'
import { m } from '@/paraglide/messages'
import { Skeleton } from '@/components/ui/skeleton'

const NearbyMapEmbed = lazy(() =>
  import('@/components/NearbyMapEmbed').then((mod) => ({
    default: mod.NearbyMapEmbed,
  })),
)

export const Route = createFileRoute('/_public/geo-assistance')({
  component: GeoAssistancePage,
})

function GeoAssistancePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <section className="animate-fade-in-up text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <MapPin className="h-7 w-7 text-primary" />
        </div>
        <h1 className="mb-4 text-4xl font-bold">{m.geo_title()}</h1>
        <p className="text-lg text-muted-foreground">{m.geo_subtitle()}</p>
      </section>

      <Card className="animate-fade-in-up stagger-1 border-border/50">
        <CardHeader>
          <CardTitle>Emergency Numbers</CardTitle>
          <CardDescription>
            Important numbers you should always have handy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Ambulance', number: '102' },
            { label: 'Emergency (India)', number: '112' },
            { label: 'Police', number: '100' },
            { label: 'Fire', number: '101' },
          ].map(({ label, number }) => (
            <div
              key={number}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-medium">{label}</span>
              </div>
              <a
                href={`tel:${number}`}
                className="font-bold text-primary hover:underline"
              >
                {number}
              </a>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="animate-fade-in-up stagger-2 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-5 w-5 text-primary" />
            Hospitals Near You
          </CardTitle>
          <CardDescription>
            Live map showing hospitals based on your current location.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Suspense
            fallback={<Skeleton className="h-[420px] w-full rounded-xl" />}
          >
            <NearbyMapEmbed
              query="hospital near me"
              title="Hospitals near me"
              heightClass="h-[420px]"
            />
          </Suspense>
          <a
            href="https://www.google.com/maps/search/hospital+near+me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-primary hover:underline"
          >
            Open full map in Google Maps ↗
          </a>
        </CardContent>
      </Card>
    </main>
  )
}
