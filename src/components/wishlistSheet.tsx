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
import { Button } from "./ui/button";
import { WishlistProductsList } from "@/components/wishlistProductsList";
import { useWishlist } from "@/hooks/wishlist";

export function WishlistSheet() {
  const { wishlist } = useWishlist();
  const active = wishlist.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Heart fill={active ? '#ff4000' : 'white'} stroke={active ? '#7a2306' : 'currentColor'} />
          {wishlist.length}
          {/* Want the amount of items instead? */}
          {/* {wishlist.reduce((amount, item) => (amount + item.quantity), 0)} */}
        </Button>
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
