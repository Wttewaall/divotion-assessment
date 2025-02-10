import { ProductsList } from '@/components/productsList';
import { HeaderTop } from '@/components/headerTop';
import type { Metadata } from 'next';

export default function Home() {
  return (
    <>
      <HeaderTop sticky={true} />
      <main className="container mx-auto">
        {/* <h2>HELLO: {process.env.HELLO}</h2> */}
        <ProductsList />
      </main>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};
