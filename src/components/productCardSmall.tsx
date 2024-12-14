"use client";

import {
  Card,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/app/hooks/wishlist";
import { getCurrencyFormatter } from "@/lib/currency";
import { ProductData } from "@/lib/getProducts";

type ProductCardProps = {
  product: ProductData;
};

export function ProductCardSmall({ product }: ProductCardProps) {
  const { productIds, toggle } = useWishlist();
  const active = productIds.includes(product.id);
  const currencyFormatter = getCurrencyFormatter();

  return (
    <Card>
      <CardHeader className="flex flex-row gap-5 relative">
        <Image
          src={product.image}
          width={80}
          height={114}
          alt={product.title}
          className="object-contain"
        />
        <Button
          variant="outline"
          className="absolute top-2 right-2 p-5 m-0"
          onClick={() => toggle(product.id)}
        >
          <Heart
            fill={active ? "#ff4000" : "white"}
            stroke={active ? "#7a2306" : "currentColor"}
          />
        </Button>

        <div className="flex flex-col flex-grow pt-8">
          <CardTitle>{product.title}</CardTitle>
          <div className="mb-4 font-semibold">
            {currencyFormatter.format(product.price)}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
