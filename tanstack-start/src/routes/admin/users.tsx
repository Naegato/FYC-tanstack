import { AddUser } from '@/components/modal/add-user.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography.tsx'
import { fetchTotalUsersCount, usersCollection } from '@/lib/query.ts'
import { queryClient } from '@/lib/react-query.ts'
import { useLiveQuery } from '@tanstack/react-db'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
  ssr: false,
})

function RouteComponent() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { pageIndex, pageSize } = pagination

  const { data, isLoading } = useLiveQuery(
    (q) =>
      q
        .from({
          users: usersCollection,
        })
        .limit(pageSize)
        .offset(pageIndex * pageSize)
        .orderBy(({ users }) => users.createdAt, 'asc'),
    [pageIndex, pageSize],
  )

  const totalCount = useQuery({
    queryKey: ['users', 'count'],
    queryFn: fetchTotalUsersCount,
  })

  const table = useReactTable({
    data,
    columns: [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Rôle' },
    ],
    state: {
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    rowCount: totalCount.data || 0,
  })

  const handleDeleteUsers = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const selectedIds = selectedRows.map((row) => row.original.id)

    selectedIds.forEach((id) => {
      usersCollection.delete(id)
    })
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Typography type="h1" className="text-start">
            Gestion des utilisateurs
          </Typography>
          <Typography type="p">
            Ici, vous pouvez gérer les utilisateurs de l'application.
          </Typography>
        </div>
        <AddUser
          onSuccess={async (user) => {
            await usersCollection.insert(user)
            await queryClient.invalidateQueries({
              queryKey: ['users', 'count'],
            })
            table.lastPage()
          }}
        />
      </div>
      {table.getSelectedRowModel().rows.length > 0 && (
        <div className="my-4">
          <Button variant="destructive" onClick={handleDeleteUsers}>
            Supprimer les utilisateurs sélectionnés
          </Button>
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                <Spinner />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
