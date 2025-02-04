'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const WISHLIST_KEY = 'wishlist';

export type WishlistItem = { id: number; quantity: number };

interface WishlistState {
  wishlist: WishlistItem[];
  isWishlisted: (productId: number) => boolean;
  getItem: (productId: number) => WishlistItem | undefined;
  append: (productId: number) => void;
  remove: (productId: number) => void;
  toggle: (productId: number) => void;
  increment: (productId: number, amount?: number | string) => void;
  decrement: (productId: number, amount?: number | string) => void;
  change: (productId: number, amount: number | string) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      isWishlisted: (productId: number) => isWishlisted(get().wishlist, productId),
      getItem: (productId) => getItem(get().wishlist, productId),
      append: (productId) => set({ wishlist: toggleItem(get().wishlist, productId, true) }),
      remove: (productId) => set({ wishlist: toggleItem(get().wishlist, productId, false) }),
      toggle: (productId) => set({ wishlist: toggleItem(get().wishlist, productId) }),
      increment: (productId, amount = 1) =>
        set({ wishlist: modifyQuantity(get().wishlist, productId, 'increment', amount) }),
      decrement: (productId, amount = 1) =>
        set({ wishlist: modifyQuantity(get().wishlist, productId, 'decrement', amount) }),
      change: (productId, amount) => set({ wishlist: modifyQuantity(get().wishlist, productId, 'change', amount) }),
    }),
    {
      name: WISHLIST_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function isWishlisted(wishlist: WishlistItem[], productId: number): boolean {
  return wishlist.findIndex((item) => item.id === productId) > -1;
}

function getItem(wishlist: WishlistItem[], productId: number): WishlistItem | undefined {
  return wishlist.find((item) => item.id === productId);
}

function toggleItem(wishlist: WishlistItem[], productId: number, append?: boolean): WishlistItem[] {
  const productIndex = wishlist.findIndex((item) => item.id === productId);
  const hasProduct = productIndex > -1;

  // toggle
  if (append === undefined) {
    if (!hasProduct) wishlist.push({ id: productId, quantity: 1 });
    else wishlist.splice(productIndex, 1);
  } else {
    if (append && !hasProduct) wishlist.push({ id: productId, quantity: 1 });
    else if (!append && hasProduct) wishlist.splice(productIndex, 1);
  }

  return wishlist;
}

function modifyQuantity(
  wishlist: WishlistItem[],
  productId: number,
  mode: 'increment' | 'decrement' | 'change',
  amount: number | string
) {
  const productIndex = wishlist.findIndex((item) => item.id === productId);
  const hasProduct = productIndex > -1;

  // validate input: strip out all characters other than digits [0-9], default to 0
  const value = parseInt(amount.toString().replace(/\D/, '')) || 0;

  if (!hasProduct) return wishlist;

  let quantity = wishlist[productIndex].quantity;

  switch (mode) {
    case 'increment':
      quantity += value;
      break;
    case 'decrement':
      quantity -= value;
      break;
    default:
      quantity = value;
  }

  // limit to a minimum of 0
  wishlist[productIndex].quantity = Math.max(0, quantity);

  return wishlist;
}
