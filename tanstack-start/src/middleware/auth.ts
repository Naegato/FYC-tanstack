import { isLoggedIn } from '@/lib/utils/auth.ts'
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