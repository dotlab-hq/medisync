import { Link } from '@tanstack/react-router'
import { Heart } from 'lucide-react'
import { m } from '@/paraglide/messages'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-border/50 bg-muted/30 px-4 pb-10 pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Heart className="h-4 w-4 text-primary" />
            </span>
            <div>
              <p className="m-0 text-base font-bold text-foreground">MediSync</p>
              <p className="m-0 text-xs text-muted-foreground">
                Emergency Medical Data on the Go
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/privacy"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {m.footer_privacy()}
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {m.footer_terms()}
            </Link>
            <Link
              to="/help"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {m.nav_help()}
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {m.nav_about()}
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-4 text-center text-xs text-muted-foreground">
          &copy; {year} MediSync. {m.footer_rights()}
        </div>
      </div>
    </footer>
  )
}
