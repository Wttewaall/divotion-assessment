'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Heart, UserPen } from 'lucide-react';
import Image from 'next/image';
import { useWishlist } from '@/hooks/wishlist';
import { Rating } from '@/components/rating';
import { getCurrencyFormatter } from '@/lib/currency';
import { ProductData } from '@/lib/getProducts';

type ProductCardProps = {
  product: ProductData;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isWishlisted, toggle } = useWishlist();
  const active = isWishlisted(product.id);
  const currencyFormatter = getCurrencyFormatter();

  return (
    <Card>
      <CardHeader className="relative">
        <Image
          src={product.image}
          width={235}
          height={200}
          alt={product.title}
          className="h-[200px] object-contain mb-4"
          priority={priority}
        />
        <Button variant="outline" className="absolute p-5 m-0 top-2 right-2" onClick={() => toggle(product.id)}>
          <Heart fill={active ? '#ff4000' : '#ffffff'} stroke={active ? '#7a2306' : '#09090b'} />
        </Button>

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
}
