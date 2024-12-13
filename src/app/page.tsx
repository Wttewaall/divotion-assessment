import ProductsList from "@/components/ProductsList";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
// import { ProductData } from "@/types/productData";

// export const getServerSideProps = (async () => {
//   const res = await fetch(`${process.env.API_URL}/${process.env.API_PRODUCTS}`);
//   const products: ProductData[] = await res.json();
//   return { props: { products } };
// }) satisfies GetServerSideProps<{ products: ProductData[] }>;

// type ProductsListProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// export default function Home({ products }: ProductsListProps) {
export default function Home() {
  return (
    <main className="container mx-auto">
      <ProductsList></ProductsList>
    </main>
  );
}
