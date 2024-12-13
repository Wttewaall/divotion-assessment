"use client"

import { ProductData } from "@/types/productData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Heart, Star, StarHalf, UserPen } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/app/hooks/wishlist";
import Rating from "./Rating";

type ProductCardProps = {
  product: ProductData;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { productIds, toggle } = useWishlist();
  const active = productIds.includes(product.id);

  return (
    <Card>
      <CardHeader className="relative">
        <Image
          src={product.image}
          width={280}
          height={0}
          alt={product.title}
          className="h-[200px] object-contain mb-4"
        ></Image>
        <Button
          variant="outline"
          className="absolute top-2 right-2 p-5 m-0"
          onClick={() => toggle(product.id)}
        >
          <Heart fill={active ? 'red' : 'white'}></Heart>
        </Button>

        <CardTitle className="line-clamp-3 h-12">{product.title}</CardTitle>
        <em>{product.category}</em>
        <CardDescription className="line-clamp-3">{product.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 font-semibold">&euro; { product.price }</div>
        <div className="flex gap-5">
            <Rating rate={product.rating.rate}></Rating>
            <small className="flex gap-2"><UserPen/> {product.rating.count}</small>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
