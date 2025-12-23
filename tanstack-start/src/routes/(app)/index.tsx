import { Typography } from '@/components/ui/typography'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col justify-center items-center p-25 h-full">
    <Typography type="h1">
      Bienvenue sur notre super plateforme !
    </Typography>
  </div>
}
