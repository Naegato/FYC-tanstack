import { Typography } from '@/components/ui/typography'
import { AuthMiddleware } from '@/middleware/auth.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col mt-20">
    <Typography type="h1">
      Bienvenue dans le panneau d'administration !
    </Typography>
  </div>
}
