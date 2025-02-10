'use client';

import Image from 'next/image';
import { Rating } from '@/components/rating';
import { getCurrencyFormatter } from '@/lib/currency';
import { ProductData } from '@/lib/productsService';
import React, { memo, useEffect, useState } from 'react';
import FavoriteButton from '@/components/favoriteButton';
import { UserPen } from 'lucide-react';
import { useWishlist } from '@/hooks/wishlist';

interface ProductDetailProps {
  product: ProductData;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { wishlist, isWishlisted, toggle } = useWishlist();
  const [active, setActive] = useState(false);
  const currencyFormatter = getCurrencyFormatter();

  useEffect(() => {
    setActive(isWishlisted(product.id));
  }, [wishlist.length]);

  const onFavoriteClick = () => {
    toggle(product.id);
  };

  return (
    <main className="container mx-auto">
      <section data-testid="product-detail" className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <div>
          <Image
            src={product.image}
            width={200}
            height={300}
            alt={product.title}
            priority={true}
            className="w-full h-auto"
            aria-label="product image"
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <div className="flex gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <FavoriteButton isActive={active} onClick={onFavoriteClick} />
          </div>
          <p>
            <em>{product.category}</em>
          </p>
          <p className="text-lg text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold">{currencyFormatter.format(product.price)}</p>

          <div className="flex gap-6">
            <Rating rate={product.rating.rate} />
            <small className="flex gap-2">
              <UserPen /> {product.rating.count}
            </small>
          </div>
        </div>
      </section>
    </main>
  );
};

export default memo(ProductDetail);
