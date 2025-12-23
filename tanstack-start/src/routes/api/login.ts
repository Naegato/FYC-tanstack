import { prisma } from '@/lib/prisma.ts'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const schema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .regex(
      /[A-Z]/,
      'Le mot de passe doit contenir au moins une lettre majuscule',
    )
    .regex(
      /[a-z]/,
      'Le mot de passe doit contenir au moins une lettre minuscule',
    )
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(
      /[^A-Za-z0-9]/,
      'Le mot de passe doit contenir au moins un caractère spécial',
    ),
})

export const Route = createFileRoute('/api/login')({
  server: {
    handlers: {
      async POST({ request }) {
        const body = await request.json()
        const data = schema.safeParse(body)

        // const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        // await delay(5000); // Artificial delay to mitigate brute-force attacks

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const userData = await prisma.user.findUnique({
          where: { email: data.data.email },
        })

        if (!userData) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const verify = await argon2.verify(
          userData.password || '',
          data.data.password,
        )

        if (!verify) {
          return new Response(
            JSON.stringify({ error: 'Invalid email or password' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const token = jwt.sign({
          userId: userData.id,
        }, jwtSecret)

        return new Response(JSON.stringify({ token }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      },
    },
  },
})
