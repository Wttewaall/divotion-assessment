"use client";

import { ProductCard } from "@/components/productCard";
import { useWishlist } from "@/app/hooks/wishlist";
import { Suspense, useEffect, useState } from "react";
import { getProducts, ProductData } from "@/lib/getProducts";

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
    <section>
      <div className="flex flex-col overflow-y-scroll max-h-100">
        <Suspense fallback={<p>Loading...</p>}>
          {wishedProducts.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </Suspense>
      </div>
    </section>
  );
}
