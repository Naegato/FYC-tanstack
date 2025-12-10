import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/courses/"!</div>
}
