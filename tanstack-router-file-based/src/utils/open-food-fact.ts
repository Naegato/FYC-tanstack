const apiUrl = 'https://world.openfoodfacts.net/api/v2/search';

type OpenFoodFactResponse = {
  page: number;
  page_count: number;
  page_size: number;
  products: unknown[];
}

export const fetchOpenFoodFactData = async (pageSize: number = 20, numberOfPages: number = 1) => {
  const res = await fetch(`${apiUrl}?page_size=${pageSize}`, {
    method: 'GET',
  });

  const data: OpenFoodFactResponse = await res.json();

  if (numberOfPages === 1 ) {
    return data;
  }

  for (let i = 2; i <= numberOfPages; i++) {
    const multiPageRes = await fetch(`${apiUrl}?page_size=${pageSize}&page=${i}`, {
      method: 'GET',
    });

    const multiPageResData: OpenFoodFactResponse = await multiPageRes.json();

    data.page_size = data.page_size + multiPageResData.page_size;
    data.products = [...data.products, ...multiPageResData.products];
  }

  data.page_count = Math.round(data.page_count / numberOfPages);

  return data;
}