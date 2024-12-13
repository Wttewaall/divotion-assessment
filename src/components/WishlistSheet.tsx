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
import WishlistProductsList from "./WishlistProductsList";
import { useWishlist } from "@/app/hooks/wishlist";

export default function WishlistSheet() {
  const { productIds } = useWishlist();
  const active = productIds.length > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Heart fill={active ? 'red' : 'white'}></Heart> {productIds.length}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your saved favorites</SheetTitle>
          <SheetDescription>Manage your {productIds.length} favorites</SheetDescription>
        </SheetHeader>
        <WishlistProductsList></WishlistProductsList>
      </SheetContent>
    </Sheet>
  );
}
