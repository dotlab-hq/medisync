'use client'

import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, LayoutDashboard } from 'lucide-react'
import ParaglideLocaleSwitcher from './LocaleSwitcher.tsx'
import ThemeToggle from './ThemeToggle'
import { m } from '@/paraglide/messages'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

const navLinks = [
  { to: '/' as const, label: () => m.nav_home(), exact: true },
  { to: '/about' as const, label: () => m.nav_about() },
  { to: '/help' as const, label: () => m.nav_help() },
  { to: '/camps' as const, label: () => m.nav_camps() },
  { to: '/geo-assistance' as const, label: () => m.nav_geo() },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/80 shadow-md backdrop-blur-xl border-b border-border/50'
          : 'bg-background/60 backdrop-blur-lg',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-x-3 px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary no-underline transition-colors hover:bg-primary/20 sm:px-4 sm:py-2"
          onClick={closeMenu}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[var(--mint-leaf)] to-[var(--celadon)]" />
          MediSync
        </Link>

        {/* Desktop nav links */}
        <div className="ml-6 hidden items-center gap-x-1 text-sm font-medium md:flex">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: 'rounded-lg px-3 py-2 bg-primary/10 text-primary font-semibold' }}
            >
              {label()}
            </Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ParaglideLocaleSwitcher />
          <ThemeToggle />

          {/* Auth controls — desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
            ) : session?.user ? (
              <Link to="/dashboard">
                <Button size="sm" className="gap-2">
                  <LayoutDashboard className="h-4 w-4" />
                  {m.nav_dashboard()}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">
                    {m.nav_login()}
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm">{m.nav_signup()}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: 'rounded-lg px-3 py-2.5 text-sm font-semibold bg-primary/10 text-primary' }}
                onClick={closeMenu}
              >
                {label()}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-border/50 pt-3">
              {isPending ? null : session?.user ? (
                <Link to="/dashboard" onClick={closeMenu}>
                  <Button className="w-full gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    {m.nav_dashboard()}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      {m.nav_login()}
                    </Button>
                  </Link>
                  <Link to="/auth/signup" onClick={closeMenu}>
                    <Button className="w-full">{m.nav_signup()}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
