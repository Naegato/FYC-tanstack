import * as React from 'react'
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/counter">
          Counter
        </Link>
        <Link to="/data-loading">
          Data Loading
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
