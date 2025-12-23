import { Layout } from '@/components/layout.tsx'
import { AuthMiddleware } from '@/middleware/auth.ts'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Layout>
    <Outlet />
  </Layout>
}
