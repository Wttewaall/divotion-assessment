"use client"

import { ProductCard } from "@/components/productCard";
import { getProducts, ProductData } from "@/lib/getProducts";
import { Suspense, useEffect, useState } from "react";

export function ProductsList() {
  const [ products, setProducts ] = useState<ProductData[]>([]);

  useEffect(() => {
      async function loadData() {
        setProducts(await getProducts());
      };
      loadData();
    }, []);

  return (
    <section>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </Suspense>
    </section>
  );
}
