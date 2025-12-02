const apiUrl = 'https://world.openfoodfacts.net/api/v2/search';

export const fetchOpenFoodFactData = async (pageSize: number = 20) => {
  const res = await fetch(`${apiUrl}?page_size=${pageSize}`, {
    method: 'GET',
  });

  const data = await res.json();

  return data;
}