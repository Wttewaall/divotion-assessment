import { ProductsList } from '@/components/productsList';
import { HeaderTop } from '@/components/headerTop';

export default function Home() {
  return (
    <>
      <HeaderTop />
      <main className="container mx-auto">
        {/* <h2>HELLO: {process.env.HELLO}</h2> */}
        <ProductsList />
      </main>
    </>
  );
}
