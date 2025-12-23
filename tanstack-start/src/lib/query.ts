import { createCollection, parseLoadSubsetOptions } from '@tanstack/db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import { QueryClient } from '@tanstack/query-core'
import { User } from 'generated/prisma/client.ts'

const queryClient = new QueryClient();

export const usersCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["users"],
    queryFn: async (ctx) => {
      const { limit, offset, where, orderBy } = ctx.meta?.loadSubsetOptions || {}
      const parsed = parseLoadSubsetOptions({ where, orderBy, limit })
      const params = new URLSearchParams()

      if (parsed.sorts.length > 0) {
        const sortParam = parsed.sorts[0]
        params.set('orderBy', String(sortParam.field[0]))
        params.set('orderDir', sortParam.direction)
      }

      if (parsed.limit) {
        params.set('limit', String(parsed.limit))
      }

      if (offset) {
        params.set('page', String(offset))
      }

      const response = await fetch(`http://localhost:3000/api/users?${params}`)
      const data: {
        items: Array<Partial<User> & Pick<User, 'id' | 'email' | 'password'>>
        total: number
        total_pages: number
        page: number
        limit: number
      } = await response.json()
      ctx.client.setQueryData(['users', 'count'], data.total)

      return data.items;
    },
    queryClient,
    getKey: (item) => item.id,
    onDelete: async ({transaction}) => {
      const idsToDelete = transaction.mutations.map((m) => m.key as string)

      for (const id of idsToDelete) {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          throw new Error(`Failed to delete user with id ${id}`)
        }
      }

      return { refetch: true }
    },
    onInsert: async () => {
      return { refetch: true }
    },
    syncMode: 'on-demand',
  })
)

export const fetchTotalUsersCount = async () => {
  const params = new URLSearchParams()
  params.set('limit', '1')
  params.set('page', '1')
  const response = await fetch(`http://localhost:3000/api/users?${params}`)
  const data: {
    items: Array<User>
    total: number
    total_pages: number
    page: number
    limit: number
  } = await response.json()
  return data.total
}