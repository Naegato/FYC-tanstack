import { Layout } from '@/components/layout.tsx'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Layout>
    <Outlet />
  </Layout>
}
