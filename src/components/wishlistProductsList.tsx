'use client';

import { useWishlist } from '@/hooks/wishlist';
import { getProducts } from '@/lib/productsService';
import { ProductCardSmall } from '@/components/productCardSmall';

export function WishlistProductsList() {
  const products = getProducts();
  const { wishlist, getItem, isWishlisted, toggle, increment, decrement, change } = useWishlist();
  const wishedProducts = products.filter((product) => wishlist.find((item) => item.id === product.id));

  console.log('WishlistProductsList');

  return (
    <section role="feed" className="flex flex-col h-full gap-2 overflow-y-scroll">
      {wishedProducts.map((product) => (
        <ProductCardSmall
          key={product.id}
          product={product}
          active={isWishlisted(product.id)}
          amount={getItem(product.id)?.quantity || 0}
          onFavoriteClick={() => toggle(product.id)}
          onIncrementClick={() => increment(product.id)}
          onInputChange={(value) => change(product.id, parseInt(value))}
          onDecrementClick={() => decrement(product.id)}
        />
      ))}
    </section>
  );
}
