import { useSession } from '@tanstack/react-start/server'

type SessionData = {
  token?: string
}

export function useAppSession() {
  const sessionSecret = process.env.SESSION_SECRET
  if (!sessionSecret) {
    throw new Error(
      'SESSION_SECRET environment variable must be set and at least 32 characters long',
    )
  }

  return useSession<SessionData>({
    name: 'app-session',
    password: sessionSecret,
    // Optional: customize cookie settings
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // httpOnly: true,
      httpOnly: false,
    },
  })
}