'use client';

import { ProductCard } from '@/components/productCard';
import { getProducts, ProductData } from '@/lib/getProducts';
import { Suspense, useEffect, useState } from 'react';

export function ProductsList() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function loadData() {
      setProducts(await getProducts());
    }
    loadData();
  }, []);

  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 6}></ProductCard>
          ))}
        </div>
      </Suspense>
    </section>
  );
}
