import { AdminLayout } from '@/components/admin/layout.tsx'
import { AuthBeforeLoad, AuthMiddleware } from '@/middleware/auth.ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  server: {
    middleware: [AuthMiddleware]
  },
  beforeLoad: AuthBeforeLoad
})

function RouteComponent() {
  return <AdminLayout>
    <Outlet />
  </AdminLayout>
}
