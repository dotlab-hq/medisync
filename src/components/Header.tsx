'use client'

import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import ParaglideLocaleSwitcher from './LocaleSwitcher.tsx'
import BetterAuthHeader from '../integrations/better-auth/header-user.tsx'
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
  const [isMenuOpen, setIsMenuOpen] = useState( false )
  const [scrolled, setScrolled] = useState( false )
  const { data: session, isPending } = authClient.useSession()

  useEffect( () => {
    const onScroll = () => setScrolled( window.scrollY > 10 )
    window.addEventListener( 'scroll', onScroll, { passive: true } )
    return () => window.removeEventListener( 'scroll', onScroll )
  }, [] )

  const closeMenu = () => setIsMenuOpen( false )

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full border-b border-[var(--line)] transition-all duration-300',
        scrolled
          ? 'bg-[var(--header-bg)] shadow-sm backdrop-blur-md'
          : 'bg-[var(--header-bg)] backdrop-blur-lg',
      ].join( ' ' )}
    >
      {/* ── Desktop bar ──────────────────────────────────────────── */}
      <nav className="page-wrap flex items-center gap-x-3 py-3 sm:py-4">
        {/* Logo */}
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
            onClick={closeMenu}
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            MediSync
          </Link>
        </h2>

        {/* Desktop nav links */}
        <div className="ml-6 hidden items-center gap-x-5 text-sm font-semibold md:flex">
          {navLinks.map( ( { to, label } ) => (
            <Link
              key={to}
              to={to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {label()}
            </Link>
          ) )}
        </div>

        {/* Right side controls */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ParaglideLocaleSwitcher />
          <ThemeToggle />

          {/* Auth controls — desktop */}
          <div className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <div className="h-8 w-16 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" />
            ) : session?.user ? (
              <BetterAuthHeader />
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
            className="flex items-center justify-center rounded-md p-2 text-[var(--sea-ink-soft)] transition-colors hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen( ( v ) => !v )}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      {isMenuOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-md md:hidden">
          <div className="page-wrap flex flex-col gap-1 py-4">
            {navLinks.map( ( { to, label } ) => (
              <Link
                key={to}
                to={to}
                className="nav-link py-2 text-sm font-semibold"
                activeProps={{ className: 'nav-link is-active py-2 text-sm font-semibold' }}
                onClick={closeMenu}
              >
                {label()}
              </Link>
            ) )}

            <div className="mt-3 flex flex-col gap-2 border-t border-[var(--line)] pt-3">
              {isPending ? null : session?.user ? (
                <BetterAuthHeader />
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
