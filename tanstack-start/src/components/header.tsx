import { Button } from '@/components/ui/button.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { cn } from '@/lib/utils.ts'
import { FC, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

export const Header: FC = () => {
  const currentPath = useRouterState({ select: (s) => s.location.pathname })

  const mapping = {
    '/': 'Home',
    '/courses': 'Courses',
    '/login': 'Login',
  }

  const adminMapping = {
    '/admin': 'Dashboard',
  }

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
