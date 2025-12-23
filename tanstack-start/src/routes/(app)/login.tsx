import { RegisterForm } from '@/components/form/register.tsx'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import { createFileRoute } from '@tanstack/react-router'
import { Tabs } from '@/components/ui/tabs'
import { LoginForm } from '@/components/form/login'

export const Route = createFileRoute('/(app)/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Tabs defaultValue="login" className="w-full sm:max-w-md mx-auto mt-15">
      <TabsList>
        <TabsTrigger value="login">
          Connexion
        </TabsTrigger>
        <TabsTrigger value="register">
          Inscription
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  )
}
