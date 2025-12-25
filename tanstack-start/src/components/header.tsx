import { Button } from '@/components/ui/button.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { cn } from '@/lib/utils.ts'
import { FC, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { isLoggedIn, logOut, isAdmin } from '@/lib/utils/auth.ts'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const Header: FC = () => {
  const currentPath = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: loggedIn } = useQuery({
    queryKey: ['isLoggedIn'],
    queryFn: async () => {
      const result = await isLoggedIn()
      return result
    },
  })

  const { data: admin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const result = await isAdmin()
      return result
    },
    enabled: !!loggedIn,
  })

  const mapping = {
    '/': 'Home',
    '/courses': 'Courses',
    ...(loggedIn ? {} : { '/login': 'Login' }),
  }

  const adminMapping = admin ? {
    '/admin': 'Dashboard',
  } : {}

  const [open, setOpen] = useState(false)

  return <header className="bg-gray-100 flex items-start justify-end px-5 py-5">
    <nav
      className={cn(
        'flex opacity-0 max-h-0 w-full justify-center text-center transition-all duration-500',
        open && 'opacity-100 max-h-96',
      )}
    >
      <ul className="flex flex-col sm:flex-row sm:gap-10">
        {Object.entries(mapping).map(([path, label]) => (
          <Typography type="large" asChild key={path}>
            <li
              className={cn(
                'hover:underline',
                currentPath !== path && 'text-gray-400',
              )}
            >
              <Link to={path} className="focusable">
                {label}
              </Link>
            </li>
          </Typography>
        ))}
        {loggedIn && (
          <Typography type="large" asChild>
            <li
              className={cn(
                'hover:underline cursor-pointer',
                currentPath !== '/login' && 'text-gray-400',
              )}
              onClick={async () => {
                const res = await logOut()
                queryClient.invalidateQueries({ queryKey: ['isLoggedIn'] })
                queryClient.invalidateQueries({ queryKey: ['isAdmin'] })
                if (res.redirect) {
                  await navigate({ to: res.redirect })
                }
              }}
            >
              Logout
            </li>
          </Typography>
        )}
        {Object.entries(adminMapping).map(([path, label]) => (
          <Typography type="large" asChild key={path}>
            <li
              className={cn(
                'hover:underline',
                currentPath !== path && 'text-gray-400',
              )}
            >
              <Link to={path} className="focusable">
                {label}
              </Link>
            </li>
          </Typography>
        ))}
      </ul>
    </nav>
    <Button onClick={() => setOpen(!open)} type="button">
      <Menu className={cn(open && 'hidden')} />
      <X className={cn(!open && 'hidden')} />
    </Button>
  </header>;
}
