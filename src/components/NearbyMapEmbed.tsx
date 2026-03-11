import { useState, useEffect } from 'react'
import { MapPin, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface NearbyMapEmbedProps {
  query: string
  title: string
  /** Tailwind height class, e.g. "h-[400px]" or "h-96" */
  heightClass?: string
}

type LocationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'denied'; error: string }
  | { status: 'ready'; lat: number; lng: number }

function buildEmbedUrl(query: string, lat?: number, lng?: number): string {
  if (lat !== undefined && lng !== undefined) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}&z=13&output=embed&t=m`
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&t=m`
}

export function NearbyMapEmbed({
  query,
  title,
  heightClass = 'h-[400px]',
}: NearbyMapEmbedProps) {
  const [location, setLocation] = useState<LocationState>({ status: 'idle' })

  function requestLocation() {
    setLocation({ status: 'loading' })
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          status: 'ready',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {
        setLocation({
          status: 'denied',
          error: err.message || 'Location access denied',
        })
      },
      { timeout: 10_000, enableHighAccuracy: true },
    )
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      requestLocation()
    } else {
      setLocation({
        status: 'denied',
        error: 'Geolocation not supported by your browser.',
      })
    }
  }, [])

  const iframeSrc =
    location.status === 'ready'
      ? buildEmbedUrl(query, location.lat, location.lng)
      : buildEmbedUrl(query)

  return (
    <div className="space-y-2">
      {location.status === 'loading' && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Detecting your location for accurate results…
        </div>
      )}

      {location.status === 'denied' && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{location.error} — showing generic results.</span>
            <Button size="sm" variant="outline" onClick={requestLocation}>
              <MapPin className="h-3 w-3 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {location.status === 'ready' && (
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <MapPin className="h-4 w-4" />
          Showing results near your current location
        </div>
      )}

      <div
        className={`rounded-xl overflow-hidden border shadow-sm ${heightClass}`}
      >
        {location.status !== 'loading' && (
          <iframe
            title={title}
            src={iframeSrc}
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full border-0"
          />
        )}
        {location.status === 'loading' && (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  )
}
