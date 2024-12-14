"use client"
import { create } from "zustand";

const WISHLIST_KEY = 'wishlist';

interface WishlistState {
  productIds: number[]
  append: (productId: number) => void
  remove: (productId: number) => void
  toggle: (productId: number) => void
}

export const useWishlist = create<WishlistState>()((set) => ({
  productIds: getProductIds(),
  append: (productId) =>
    set((_state) => ({ productIds: toggle(productId, true) })),
  remove: (productId) =>
    set((_state) => ({ productIds: toggle(productId, false) })),
  toggle: (productId) =>
    set((_state) => ({ productIds: toggle(productId) }))
}));

function getProductIds(): number[] {
  if (!window) return [];
  const jsonData = window.localStorage.getItem(WISHLIST_KEY);
  return jsonData !== null ? Array.from<number>(JSON.parse(jsonData)) : [];
}

function toggle(productId: number, append?: boolean): number[] {
  if (!window) return [];
  const wishlist = getProductIds();
  const hasProduct = wishlist.includes(productId);

  // toggle
  if (append === undefined) {
    if (!hasProduct) wishlist.push(productId);
    else wishlist.splice(wishlist.indexOf(productId), 1);
  } else {
    if (append && !hasProduct) wishlist.push(productId);
    else if (!append && hasProduct) wishlist.splice(wishlist.indexOf(productId), 1);
  }

  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));

  return wishlist;
}
