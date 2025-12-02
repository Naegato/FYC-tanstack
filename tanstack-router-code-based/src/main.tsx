import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Home } from './components/home';
import App from './components/counter/App.tsx';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/counter">
          About
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const counterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/counter',
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute, counterRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}