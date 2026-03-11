import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { getSession } from '@/server/auth'

export const Route = createFileRoute('/auth')({
  beforeLoad: async () => {
    const session = await getSession()
    if (session?.user) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
