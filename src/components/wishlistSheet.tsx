"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart } from "lucide-react";
import { WishlistProductsList } from "@/components/wishlistProductsList";
import { useWishlist } from "@/hooks/wishlist";

export function WishlistSheet() {
  const { wishlist } = useWishlist();
  const active = wishlist.length > 0;

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 px-3 py-2">
          Favorites
          <Heart
            fill={active ? "#ff4000" : "#ffffff"}
            stroke={active ? "#7a2306" : "#09090b"}
          />
          {wishlist.length}
          {/* Want the amount of items instead? */}
          {/* {wishlist.reduce((amount, item) => (amount + item.quantity), 0)} */}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your saved favorites</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <WishlistProductsList />
      </SheetContent>
    </Sheet>
  );
}
