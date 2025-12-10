import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/register"!</div>
}
