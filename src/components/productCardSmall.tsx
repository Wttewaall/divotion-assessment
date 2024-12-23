"use client";

import {
  Card,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/hooks/wishlist";
import { getCurrencyFormatter } from "@/lib/currency";
import { ProductData } from "@/lib/getProducts";
import { Input } from "@/components/ui/input"

type ProductCardProps = {
  product: ProductData;
};

export function ProductCardSmall({ product }: ProductCardProps) {
  const { getItem, toggle, increment, decrement, change } = useWishlist();
  const wishedProduct = getItem(product.id);
  const active = !!wishedProduct;
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
            fill={active ? "#ff4000" : "#ffffff"}
            stroke={active ? "#7a2306" : "#09090b"}
          />
        </Button>

        <div className="flex flex-col flex-grow pt-8">
          <CardTitle>{product.title}</CardTitle>
          <div className="mb-4 font-semibold">
            {currencyFormatter.format(product.price)}
          </div>
          <div className="flex">
            <Button variant="secondary" className="rounded-none rounded-l-md" onClick={() => decrement(product.id)}><Minus/></Button>
            <Input type="number" className="rounded-none text-center" value={wishedProduct?.quantity} onChange={(e) => change(product.id, parseInt(e.target.value))}/>
            <Button variant="secondary" className="rounded-none rounded-r-md" onClick={() => increment(product.id)}><Plus /></Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
