import { ProductsList } from '@/components/productsList';
import { HeaderTop } from '@/components/headerTop';

export default async function Home() {
  return (
    <>
      <HeaderTop />
      <main className="container mx-auto">
        <ProductsList />
      </main>
    </>
  );
}
