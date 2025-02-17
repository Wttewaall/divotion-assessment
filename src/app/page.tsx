import { ProductsList } from '@/components/productsList';
import { HeaderTop } from '@/components/headerTop';
import type { Metadata } from 'next';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* accessible first link to main content */}
      <Link
        href="#main-content"
        className="absolute left-0 top-0 bg-blue-500 text-white py-2 px-4 z-50 transform -translate-y-full focus:translate-y-0 transition"
      >
        Skip to main content
      </Link>

      <HeaderTop sticky={true} />

      <main id="main-content" className="container mx-auto">
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
