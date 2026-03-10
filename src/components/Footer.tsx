import { Link } from '@tanstack/react-router'
import { m } from '@/paraglide/messages'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="m-0 mb-1 text-base font-semibold text-[var(--sea-ink)]">MediSync</p>
            <p className="m-0 text-sm">Emergency Medical Data on the Go</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="nav-link">{m.footer_privacy()}</Link>
            <Link to="/terms" className="nav-link">{m.footer_terms()}</Link>
            <Link to="/help" className="nav-link">{m.nav_help()}</Link>
            <Link to="/about" className="nav-link">{m.nav_about()}</Link>
          </div>
        </div>
        <div className="mt-6 border-t border-[var(--line)] pt-4 text-center text-xs">
          &copy; {year} MediSync. {m.footer_rights()}
        </div>
      </div>
    </footer>
  )
}
