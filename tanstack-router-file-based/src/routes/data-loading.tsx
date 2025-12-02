import { createFileRoute } from '@tanstack/react-router'
import { fetchOpenFoodFactData } from '../utils/open-food-fact.ts';

export const Route = createFileRoute('/data-loading')({
  component: RouteComponent,
  loader: () => fetchOpenFoodFactData()
})

function RouteComponent() {
  const data = Route.useLoaderData();

  return <div>
    <h1>Data Loading</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
}
