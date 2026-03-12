import { Link, useLocation } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Home,
  FileText,
  QrCode,
  Bell,
  Calendar,
  Heart,
  MapPin,
  User,
  Settings,
  Key,
  HelpCircle,
  LogOut,
  MessageSquare,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { authClient } from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { m } from '@/paraglide/messages'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface NavItem {
  label: string
  icon: LucideIcon
  path: string
}

function getMainNav(): NavItem[] {
  return [
    { label: m.sidebar_dashboard(), icon: Home, path: '/dashboard' },
    {
      label: m.sidebar_documents(),
      icon: FileText,
      path: '/dashboard/documents',
    },
    { label: m.sidebar_qr(), icon: QrCode, path: '/dashboard/qr-code' },
    { label: m.sidebar_reminders(), icon: Bell, path: '/dashboard/reminders' },
    {
      label: m.sidebar_appointments(),
      icon: Calendar,
      path: '/dashboard/appointments',
    },
    { label: m.sidebar_camps(), icon: Heart, path: '/camps' },
    { label: m.sidebar_geo(), icon: MapPin, path: '/geo-assistance' },
    { label: 'AI Chat', icon: MessageSquare, path: '/dashboard/chat' },
  ]
}

function getAccountNav(): NavItem[] {
  return [
    { label: m.sidebar_profile(), icon: User, path: '/dashboard/profile' },
    {
      label: m.sidebar_settings(),
      icon: Settings,
      path: '/dashboard/settings',
    },
    { label: m.sidebar_developer(), icon: Key, path: '/dashboard/developer' },
    { label: m.sidebar_help(), icon: HelpCircle, path: '/help' },
  ]
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <SidebarMenu className="px-2">
      {getMainNav().map(({ label, icon: Icon, path }) => (
        <SidebarMenuItem key={path}>
          <SidebarMenuButton
            asChild
            isActive={pathname === path}
            onClick={onNavigate}
            className={cn(pathname === path && 'font-semibold')}
          >
            <Link to={path}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}

      <Separator className="my-2" />
      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Account
      </p>

      {getAccountNav().map(({ label, icon: Icon, path }) => (
        <SidebarMenuItem key={path}>
          <SidebarMenuButton
            asChild
            isActive={pathname === path}
            onClick={onNavigate}
            className={cn(pathname === path && 'font-semibold')}
          >
            <Link to={path}>
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export default function DashboardSidebar() {
  const handleLogout = async () => {
    await authClient.signOut()
    window.location.href = '/'
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center border-b border-sidebar-border/60 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Heart className="h-4 w-4 text-primary" />
          </span>
          <span className="text-foreground">MediSync</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full">
          <nav className="py-3">
            <NavItems />
          </nav>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {m.sidebar_logout()}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
