"use client";

import { useWishlist } from "@/app/hooks/wishlist";
import { Suspense, useEffect, useState } from "react";
import { getProducts, ProductData } from "@/lib/getProducts";
import { ProductCardSmall } from "./productCardSmall";

export function WishlistProductsList() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function loadData() {
      setProducts(await getProducts());
    }
    loadData();
  }, []);

  const { productIds } = useWishlist();
  const wishedProducts = products.filter((product) =>
    productIds.includes(product.id)
  );

  return (
    <section className="flex flex-col gap-2 overflow-y-scroll h-full">
      <Suspense fallback={<p>Loading...</p>}>
        {wishedProducts.map((product) => (
          <ProductCardSmall key={product.id} product={product} />
        ))}
      </Suspense>
    </section>
  );
}
