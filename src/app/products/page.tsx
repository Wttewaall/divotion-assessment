import { ProductsList } from '@/components/productsList';
import { HeaderTop } from '@/components/headerTop';
import type { Metadata } from 'next';

export default function Home() {
  return (
    <>
      <HeaderTop sticky={true} />
      <main className="container mx-auto">
        <ProductsList />
      </main>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Products',
  description: 'All available products',
};
