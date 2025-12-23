import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FC, ReactNode } from 'react'

export const Layout: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col h-auto">{children}</main>
      <Footer />
    </div>
  )
}
