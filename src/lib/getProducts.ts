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

export async function getProducts(): Promise<ProductData[]> {
  // Return data from a json file
  return new Promise((resolve, _reject) => {
    resolve(Array.from<ProductData>(mockProducts));
  });

  // Here we can use different loading methods, like fetch to load from fakestoreapi.com
  // const res = await fetch('https://fakestoreapi.com/products');
  // const products = await res.json();
  // return products;
}
