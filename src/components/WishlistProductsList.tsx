"use client"

import * as mockData from '@/app/api/products.mock.json';
import { ProductData } from '@/types/productData';
import ProductCard from "./ProductCard";
import { useWishlist } from '@/app/hooks/wishlist';

export default function WishlistProductsList() {

  // TODO: fetch via API route, or service
  const products = Array.from<ProductData>(mockData);
  const { productIds } = useWishlist();
  const wishedProducts = products.filter(product => productIds.includes(product.id));

  return (
    <section>
      <h3>Wishist ({productIds.length})</h3>
      <div className="flex flex-col overflow-y-scroll max-h-100">
        { wishedProducts.map(product => (<ProductCard key={product.id} product={product}></ProductCard>)) }
      </div>
    </section>
  );
}
