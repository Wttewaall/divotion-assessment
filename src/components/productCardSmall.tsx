'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { getCurrencyFormatter } from '@/lib/currency';
import { ProductData } from '@/lib/productsService';
import { Input } from '@/components/ui/input';
import { memo } from 'react';
import FavoriteButton from './favoriteButton';

interface ProductCardSmallProps {
  product: ProductData;
  active: boolean;
  amount: number;
  onFavoriteClick: (id: number) => void;
  onIncrementClick: () => void;
  onInputChange: (value: string) => void;
  onDecrementClick: () => void;
}

const ProductCardSmall: React.FC<ProductCardSmallProps> = ({
  product,
  active,
  amount,
  onFavoriteClick,
  onIncrementClick,
  onInputChange,
  onDecrementClick,
}) => {
  const currencyFormatter = getCurrencyFormatter();

  return (
    <Card>
      <CardHeader className="relative flex flex-row gap-5">
        <Image src={product.image} width={80} height={114} alt={product.title} className="object-contain" />
        <FavoriteButton
          classes="absolute p-5 top-2 right-2"
          isActive={active}
          onClick={() => onFavoriteClick(product.id)}
        />

        <div className="flex flex-col flex-grow pt-8">
          <CardTitle>{product.title}</CardTitle>
          <div className="mb-4 font-semibold">{currencyFormatter.format(product.price)}</div>
          <div className="flex">
            <Button
              variant="secondary"
              className="rounded-none rounded-l-md"
              aria-label="decrement"
              onClick={() => onDecrementClick()}
            >
              <Minus />
            </Button>
            <Input
              type="tel"
              className="z-0 text-center rounded-none"
              value={amount || '0'}
              aria-label="amount"
              onFocus={(e) => e.target.select()}
              onChange={(e) => onInputChange(e.target.value)}
            />
            <Button
              variant="secondary"
              className="rounded-none rounded-r-md"
              aria-label="increment"
              onClick={() => onIncrementClick()}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default memo(ProductCardSmall);
