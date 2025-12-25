import { useAppSession } from '@/lib/utils/session.ts'
import { createServerFn } from '@tanstack/react-start'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma.ts'

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

export const getCurrentUser = createServerFn({ method: 'GET' }).handler(async () => {
  const session = await useAppSession()
  const token = session.data.token

  if (!token) {
    return null
  }

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    return null
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        roles: true,
      },
    })

    return user
  } catch {
    return null
  }
})

export const hasRole = createServerFn({ method: 'POST' })
.inputValidator((role: string) => role)
.handler(async ({ input: role }) => {
  const user = await getCurrentUser()
  if (!user) {
    return false
  }

  return user.roles.includes(role)
})

export const isAdmin = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await getCurrentUser()
  if (!user) {
    return false
  }

  return user.roles.includes('ADMIN')
})