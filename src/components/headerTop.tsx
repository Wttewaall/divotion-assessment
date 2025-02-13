'use client';

import Image from 'next/image';
import { WishlistSheet } from '@/components/wishlistSheet';
import Link from 'next/link';

interface HeaderTopProps {
  sticky?: boolean;
}

export function HeaderTop({ sticky = false }: HeaderTopProps) {
  return (
    <header className={`container mx-auto bg-white ${sticky ? 'sticky top-0 z-20' : ''}`}>
      <nav className="flex justify-between py-5 row">
        <Link href="/" aria-label="home">
          <Image
            src="/acme-logo-1.svg"
            width={100}
            height={36}
            alt="Acme logo"
            priority={true}
            className="h-[36px]"
            aria-label="brand logo"
          />
        </Link>
        <WishlistSheet />
      </nav>
    </header>
  );
}
