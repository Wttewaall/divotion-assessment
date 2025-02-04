'use client';

import { useWishlist } from '@/hooks/wishlist';
import { Suspense, useEffect, useState } from 'react';
import { getProducts, ProductData } from '@/lib/getProducts';
import { ProductCardSmall } from './productCardSmall';

export function WishlistProductsList() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function loadData() {
      setProducts(await getProducts());
    }
    loadData();
  }, []);

  const { wishlist } = useWishlist();
  const wishedProducts = products.filter((product) => wishlist.find((item) => item.id === product.id));

  return (
    <section className="flex flex-col h-full gap-2 overflow-y-scroll">
      <Suspense fallback={<p>Loading...</p>}>
        {wishedProducts.map((product) => (
          <ProductCardSmall key={product.id} product={product} />
        ))}
      </Suspense>
    </section>
  );
}
