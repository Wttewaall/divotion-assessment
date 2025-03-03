import * as mockProducts from '@/lib/products.mock.json';

export type ProductData = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

// Return data from a json file
export function getProducts(): ProductData[] {
  return Array.from<ProductData>(mockProducts);
}

// Load data from a json file and return in a promise
export async function loadProducts(): Promise<ProductData[]> {
  return new Promise((resolve, _reject) => {
    resolve(getProducts());
  });

  // Here we can use different loading methods, like fetch to load from fakestoreapi.com
  // const res = await fetch('https://fakestoreapi.com/products');
  // const products = await res.json();
  // return products;
}

export const getProductById = (id: string | number | undefined): ProductData | undefined => {
  if (id === undefined) return undefined;
  return getProducts().find((p) => p.id === parseInt(id.toString()));
};
