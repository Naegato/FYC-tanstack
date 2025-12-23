import { prisma } from '@/lib/prisma.ts'
import { createFileRoute } from '@tanstack/react-router'
import * as argon2 from 'argon2'
import { z } from 'zod'

export const userSchema = z.object({
  email: z.email('Adresse email invalide'),
})

export const createUserSchema = userSchema.extend({
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

export const getUserSchema = userSchema.extend({
  id: z.uuid('ID utilisateur invalide'),
  createdAt: z.date(),
  updatedAt: z.date(),
  roles: z.array(z.string()),
});

const getUsersSchema = z.object({
  items: z.array(getUserSchema),
  total: z.number(),
  total_pages: z.number(),
  page: z.number(),
  limit: z.number(),
})

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      async GET({ request }) {
        const searchParams = new URL(request.url).searchParams
        const page = searchParams.get('page') || '1'
        const limit = searchParams.get('limit') || '10'
        const orderBy = searchParams.get('orderBy') || 'createdAt'
        const orderDir = searchParams.get('orderDir') || 'asc'

        const users = await prisma.user.findMany({
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          orderBy: { [orderBy]: orderDir as 'asc' | 'desc' },
          omit: {
            password: true,
          },
        })

        const totalUsers = await prisma.user.count()

        const parsedUsers = getUsersSchema.safeParse({
          items: users,
          total: totalUsers,
          total_pages: Math.ceil(totalUsers / Number(limit)),
          page: Number(page),
          limit: Number(limit),
        })

        if (parsedUsers.error) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        return new Response(
          JSON.stringify(parsedUsers.data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      },
      async POST({ request }) {
        const body = await request.json()
        const data = createUserSchema.safeParse(body)

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: data.data.email },
        })

        if (existingUser) {
          return new Response(
            JSON.stringify({ error: 'Email already in use' }),
            {
              status: 409,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }

        const hashedPassword = await argon2.hash(data.data.password)

        const newUser = await prisma.user.create({
          data: {
            email: data.data.email,
            password: hashedPassword,
          },
          omit: {
            password: true,
          },
        })

        const parsedUser = getUserSchema.safeParse(newUser)

        if (parsedUser.error) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        return new Response(
          JSON.stringify(parsedUser.data),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      },
    },
  },
})
