'use client';

import Image from 'next/image';
import { WishlistSheet } from '@/components/wishlistSheet';
import Link from 'next/link';
import ThemeSwitch from '@/components/themeSwitch';
import { useTheme } from 'next-themes';

interface HeaderTopProps {
  sticky?: boolean;
}

export function HeaderTop({ sticky = false }: HeaderTopProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <header className={`container mx-auto ${sticky ? 'sticky top-0 z-20 bg-inherit' : ''}`}>
      <nav className="flex justify-between py-5 row">
        <Link href="/" aria-label="home">
          <Image
            src={isDark ? '/acme-logo-1-dark.svg' : '/acme-logo-1.svg'}
            width={100}
            height={36}
            alt="Acme logo"
            priority={true}
            className="h-[36px]"
            aria-label="brand logo"
          />
        </Link>
        <ThemeSwitch />
        <WishlistSheet />
      </nav>
    </header>
  );
}
