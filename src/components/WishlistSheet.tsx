"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { WishlistProductsList } from "@/components/wishlistProductsList";
import { useWishlist } from "@/app/hooks/wishlist";

export function WishlistSheet() {
  const { productIds } = useWishlist();
  const active = productIds.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Heart fill={active ? '#ff4000' : 'white'} stroke={active ? '#7a2306' : 'currentColor'} />
          {productIds.length}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your saved favorites</SheetTitle>
        </SheetHeader>
        <WishlistProductsList />
      </SheetContent>
    </Sheet>
  );
}
