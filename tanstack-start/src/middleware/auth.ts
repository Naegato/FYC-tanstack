import { isLoggedIn, isAdmin } from '@/lib/utils/auth.ts'
import { createMiddleware } from '@tanstack/react-start'

export const AuthMiddleware = createMiddleware()
  .server(async ({ next, request }) => {
    const loggedIn = await isLoggedIn()

    if (!loggedIn) {
      return Response.redirect(
        new URL('/login', request.url),
        302,
      )
    }

    return await next();
  })

export const AuthBeforeLoad = async ({ navigate }) => {
  const loggedIn = await isLoggedIn()

  if (!loggedIn) {
    await navigate({ to: '/login' })
  }
}

export const AdminMiddleware = createMiddleware()
  .server(async ({ next, request }) => {
    const loggedIn = await isLoggedIn()
    const admin = await isAdmin()

    if (!loggedIn) {
      return Response.redirect(
        new URL('/login', request.url),
        302,
      )
    }

    if (!admin) {
      return Response.redirect(
        new URL('/', request.url),
        403,
      )
    }

    return await next();
  })

export const AdminBeforeLoad = async ({ navigate }) => {
  const loggedIn = await isLoggedIn()
  const admin = await isAdmin()

  if (!loggedIn) {
    await navigate({ to: '/login' })
    return
  }

  if (!admin) {
    await navigate({ to: '/' })
  }
}