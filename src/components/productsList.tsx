'use client';

import ProductCard from '@/components/productCard';
import { useListRenderer } from '@/hooks/listrenderer';
import { useWishlist } from '@/hooks/wishlist';
import { getProducts, ProductData } from '@/lib/productsService';
import { useEffect, useState } from 'react';

export function ProductsList() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const { isWishlisted, toggle } = useWishlist();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <section data-testid="products-list" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {useListRenderer(products, (product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={isWishlisted(product.id)}
          onFavoriteClick={toggle}
          priority={index < 6}
          withLink={`/products/${product.id}`}
        ></ProductCard>
      ))}
    </section>
  );
}
