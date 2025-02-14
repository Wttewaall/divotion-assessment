'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPen } from 'lucide-react';
import Image from 'next/image';
import { Rating } from '@/components/rating';
import { getCurrencyFormatter } from '@/lib/currency';
import { ProductData } from '@/lib/productsService';
import React, { memo } from 'react';
import Link from 'next/link';
import FavoriteButton from './favoriteButton';

interface ProductCardProps {
  product: ProductData;
  isWishlisted: boolean;
  onFavoriteClick: (productId: number) => void;
  priority?: boolean;
  withLink?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted, onFavoriteClick, priority, withLink }) => {
  const currencyFormatter = getCurrencyFormatter();

  return (
    <Card>
      <CardHeader className="relative">
        <Link href={withLink || ''}>
          <Image
            src={product.image}
            width={235}
            height={200}
            alt={product.title}
            className="h-[200px] object-contain mb-4"
            priority={priority}
          />
        </Link>

        <FavoriteButton
          classes="absolute p-5 top-2 right-2"
          isActive={isWishlisted}
          onClick={() => onFavoriteClick(product.id)}
        />

        <CardTitle className="h-12 line-clamp-3">{product.title}</CardTitle>
        <em>{product.category}</em>
        <CardDescription className="line-clamp-3">{product.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 font-semibold">{currencyFormatter.format(product.price)}</div>
        <div className="flex gap-5">
          <Rating rate={product.rating.rate} />
          <small className="flex gap-2">
            <UserPen /> {product.rating.count}
          </small>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(ProductCard);
