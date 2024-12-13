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
  append: (productId: number) =>
    set((_state) => ({ productIds: toggle(productId, true) })),
  remove: (productId: number) =>
    set((_state) => ({ productIds: toggle(productId, false) })),
  toggle: (productId: number) =>
    set((_state) => ({ productIds: toggle(productId) }))
}));

function getProductIds(): number[] {
  if (!window) return [];
  const favoritesRaw = window?.localStorage.getItem(WISHLIST_KEY);
  return favoritesRaw !== null ? Array.from<number>(JSON.parse(favoritesRaw)) : [];
}

function toggle(productId: number, append?: boolean): number[] {
  if (!window) return [];
  const favorites = getProductIds();
  const hasProduct = favorites.includes(productId);

  // toggle
  if (append === undefined) {
    if (!hasProduct) favorites.push(productId);
    else favorites.splice(favorites.indexOf(productId), 1);
  } else {
    if (append && !hasProduct) favorites.push(productId);
    else if (!append && hasProduct) favorites.splice(favorites.indexOf(productId), 1);
  }

  window?.localStorage.setItem(WISHLIST_KEY, JSON.stringify(favorites));

  return favorites;
}
