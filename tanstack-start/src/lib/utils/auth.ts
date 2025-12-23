import { useAppSession } from '@/lib/utils/session.ts'
import { createServerFn } from '@tanstack/react-start'

export const logIn = createServerFn({ method: 'POST' })
.inputValidator((data: { token: string }) => data)
.handler(async ({ data }) => {
  const session = await useAppSession()
  await session.update({
    token: data.token,
  })

  return { success: true, redirect: '/' }
})

export const logOut = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()

  return { success: true, redirect: '/login' }
})

export const isLoggedIn = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  return !!session.data.token
})