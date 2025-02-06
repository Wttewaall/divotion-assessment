'use client';

import { ProductCard } from '@/components/productCard';
import { useWishlist } from '@/hooks/wishlist';
import { getProducts, loadProducts, ProductData } from '@/lib/productsService';
import { useEffect, useState } from 'react';

export function ProductsList() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const { isWishlisted, toggle } = useWishlist();

  // load products in an effect to fix Hydration error
  useEffect(() => {
    setProducts(getProducts());
    // async function loadData() {
    //   setProducts(await loadProducts());
    // }
    // loadData();
  }, []);

  console.log('ProductsList');

  return (
    <section data-testid="products-list" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={isWishlisted(product.id)}
          onFavoriteClick={toggle}
          priority={index < 6}
        ></ProductCard>
      ))}
    </section>
  );
}
