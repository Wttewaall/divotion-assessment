'use client';

import { useWishlist } from '@/hooks/wishlist';
import { getProducts } from '@/lib/productsService';
import ProductCardSmall from '@/components/productCardSmall';

export function WishlistProductsList() {
  const products = getProducts();
  const { wishlist, getItem, isWishlisted, toggle, increment, decrement, change } = useWishlist();
  const wishedProducts = products.filter((product) => wishlist.find((item) => item.id === product.id));

  return (
    <section role="feed" className="flex flex-col h-full gap-2 overflow-y-scroll">
      {wishedProducts.map((product) => {
        return (
          // const handleFavoriteClick = useCallback(() => toggle(product.id), [toggle, product.id]);
          // const handleIncrementClick = useCallback(() => increment(product.id), [increment, product.id]);
          // const handleInputChange = useCallback((value: string) => change(product.id, parseInt(value)), [change, product.id]);
          // const handleDecrementClick = useCallback(() => decrement(product.id), [decrement, product.id]);

          <ProductCardSmall
            key={product.id}
            product={product}
            active={isWishlisted(product.id)}
            amount={getItem(product.id)?.quantity || 0}
            // onFavoriteClick={handleFavoriteClick}
            // onIncrementClick={handleIncrementClick}
            // onInputChange={handleInputChange}
            // onDecrementClick={handleDecrementClick}
            onFavoriteClick={() => toggle(product.id)}
            onIncrementClick={() => increment(product.id)}
            onInputChange={(value) => change(product.id, parseInt(value))}
            onDecrementClick={() => decrement(product.id)}
          />
        );
      })}
    </section>
  );
}
