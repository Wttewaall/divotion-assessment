import * as mockData from '@/app/api/products.mock.json';
import { ProductData } from '@/types/productData';

// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import ProductCard from "./ProductCard";
// import { ProductData } from "@/types/productData";

// export const getServerSideProps = (async () => {
//   const res = await fetch(`${process.env.API_URL}/${process.env.API_PRODUCTS}`);
//   const products: ProductData[] = await res.json();
//   return { props: { products } };
// }) satisfies GetServerSideProps<{ products: ProductData[] }>;

// type ProductsListProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// export default async function ProductsList({ products }: ProductsListProps) {
export default async function ProductsList() {

  // TODO: fetch via API route, or service
  const products = Array.from<ProductData>(mockData);

  return (
    <section>
      <h3>ProductsList ({products.length})</h3>
      <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        { products.map(product => (<ProductCard key={product.id} product={product}></ProductCard>)) }
      </ol>
    </section>
  );
}
