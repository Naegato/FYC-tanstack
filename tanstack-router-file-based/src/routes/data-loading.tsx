import { Await, createFileRoute } from '@tanstack/react-router'
import { fetchOpenFoodFactData } from '../utils/open-food-fact.ts';

export const Route = createFileRoute('/data-loading')({
  component: RouteComponent,
  loader: async () => {
    const fastData = await fetchOpenFoodFactData();
    const slowData = fetchOpenFoodFactData(100, 5)

    return {
      fastData,
      slowData,
    };
  }
})

function RouteComponent() {
  const {fastData, slowData} = Route.useLoaderData();

  return <div>
    <h1>Data Loading</h1>
    <pre>{JSON.stringify(fastData, null, 2)}</pre>
    <Await promise={slowData} fallback={<div>Loading...</div>}>
      {(data) => {
        return <pre>{JSON.stringify(data, null, 2)}</pre>
      }}
    </Await>
  </div>
}
