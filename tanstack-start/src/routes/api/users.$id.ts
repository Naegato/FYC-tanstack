import { prisma } from '@/lib/prisma.ts'
import { createUserSchema, getUserSchema } from '@/routes/api/users.ts'
import { createFileRoute } from '@tanstack/react-router'
import * as argon2 from 'argon2'

const updateUserSchema = createUserSchema.partial()

export const Route = createFileRoute('/api/users/$id')({
  server: {
    handlers: {
      async GET({ params }) {
        const id = params.id

        const user = await prisma.user.findUnique({
          where: { id },
          omit: {
            password: true,
          },
        });

        if (!user) {
          return new Response('User not found', { status: 404 });
        }

        const parsedUser = getUserSchema.safeParse(user);

        if (!parsedUser.success) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(
          JSON.stringify(parsedUser.data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      },
      async PATCH({ request, params }) {
        const id = params.id
        const body = await request.json()
        const data = updateUserSchema.safeParse(body)

        if (!data.success) {
          return new Response(JSON.stringify({ errors: data.error.issues }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        if (data.data.password) {
          data.data.password = await argon2.hash(data.data.password)
        }

        const updatedUser = await prisma.user.update({
          where: { id },
          data: data.data,
          omit: {
            password: true,
          },
        })

        const parsedUser = getUserSchema.safeParse(updatedUser)

        if (!parsedUser.success) {
          return new Response(JSON.stringify({ error: 'Data parsing error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        return new Response(
          JSON.stringify(parsedUser.data),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
      },
      async DELETE({ params }) {
        const id = params.id

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
        await delay(5000);

        return new Response({ error: 'Deletion is currently disabled for safety reasons.' }, {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });

        await prisma.user.delete({
          where: { id },
        })

        return new Response(null, { status: 204 })
      },
    },
  }
})

