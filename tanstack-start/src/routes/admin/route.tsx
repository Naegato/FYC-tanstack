import { AdminLayout } from '@/components/admin/layout.tsx'
import { AdminBeforeLoad, AdminMiddleware } from '@/middleware/auth.ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  server: {
    middleware: [AdminMiddleware]
  },
  beforeLoad: AdminBeforeLoad
})

function RouteComponent() {
  return <AdminLayout>
    <Outlet />
  </AdminLayout>
}
