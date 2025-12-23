import { Footer } from '@/components/admin/footer'
import { Button } from '@/components/ui/button.tsx'
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarGroup, SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { logOut } from '@/lib/utils/auth.ts'
import { Link, useNavigate } from '@tanstack/react-router'
import { FC, ReactNode } from 'react'

export const AdminLayout: FC<{
  children: ReactNode
}> = ({ children }) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="mb-10">
            <Typography type="large" className="text-center">
              Panneau d'administration
            </Typography>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="gap-5">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin">Tableau de bord</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/admin/users">Gestion des utilisateurs</Link>
              </Button>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button asChild>
              <Link to="/">Retour</Link>
            </Button>
            <Button variant="destructive" onClick={async () => {
              const res = await logOut()
              if (res.redirect) {
                await navigate({ to: res.redirect })
              }
            }}>
              Déconnexion
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="w-full min-h-screen flex flex-col">
          <div className="bg-gray-100 flex justify-between items-center px-5 py-2">
            <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-8 size-8 " />
          </div>
          <main className="flex flex-col h-auto w-full px-5 py-10">
            {children}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  )
}
