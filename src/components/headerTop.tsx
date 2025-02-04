'use client';

import Image from 'next/image';
import { WishlistSheet } from '@/components/wishlistSheet';

export function HeaderTop() {
  return (
    <header className="container sticky top-0 z-10 mx-auto bg-white">
      <div className="flex justify-between py-5 row">
        <Image src="acme-logo-1.svg" width={100} height={36} alt="Acme logo" priority={true} className="h-[36px]" />
        <WishlistSheet />
      </div>
    </header>
  );
}
