"use client"
import { create } from "zustand";

const WISHLIST_KEY = 'wishlist';

type WishlistItem = { id: number, quantity: number }

interface WishlistState {
  wishlist: WishlistItem[]
  isWishlisted: (productId: number) => boolean
  getItem: (productId: number) => WishlistItem | undefined
  append: (productId: number) => void
  remove: (productId: number) => void
  toggle: (productId: number) => void
  increment: (productId: number, amount?: number) => void
  decrement: (productId: number, amount?: number) => void
  change: (productId: number, amount: number) => void
}

export const useWishlist = create<WishlistState>()((set) => ({
  wishlist: getWishlist(),
  isWishlisted: (productId: number) => isWishlisted(productId),
  getItem: (productId) => getItem(productId),
  append: (productId) =>
    set((_state) => ({ wishlist: toggleItem(productId, true) })),
  remove: (productId) =>
    set((_state) => ({ wishlist: toggleItem(productId, false) })),
  toggle: (productId) =>
    set((_state) => ({ wishlist: toggleItem(productId) })),
  increment: (productId, amount = 1) =>
    set((_state) => ({ wishlist: modifyQuantity(productId, 'increment', amount = 1) })),
  decrement: (productId, amount = 1) =>
    set((_state) => ({ wishlist: modifyQuantity(productId, 'decrement', amount = 1) })),
  change: (productId, amount = 1) =>
    set((_state) => ({ wishlist: modifyQuantity(productId, 'change', amount) })),
}));

function getWishlist(): WishlistItem[] {
  return retrieve();
}

function isWishlisted(productId: number): boolean {
  const wishlist = getWishlist();
  return wishlist.findIndex(item => item.id === productId) > -1;
}

function getItem(productId: number): WishlistItem | undefined {
  const wishlist = getWishlist();
  return wishlist.find(item => item.id === productId);
}

function toggleItem(productId: number, append?: boolean): WishlistItem[] {
  const wishlist = getWishlist();
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

  store(wishlist);

  return wishlist;
}

function modifyQuantity(productId: number, mode: 'increment' | 'decrement' | 'change', amount: number) {
  const wishlist = getWishlist();
  const productIndex = wishlist.findIndex((item) => item.id === productId);
  const hasProduct = productIndex > -1;
  
  if (!hasProduct) return wishlist;

  let quantity = wishlist[productIndex].quantity;

  switch(mode) {
    case 'increment': quantity += amount; break;
    case 'decrement': quantity -= amount; break;
    default: quantity = amount;
  }

  // limit to a minimum of 0
  wishlist[productIndex].quantity = Math.max(0, quantity);

  store(wishlist);

  return wishlist;
}

// ---- These methods can be changed to use a different data storage solution ----

function retrieve(): WishlistItem[] {
  let items: WishlistItem[] = [];

  try {
    const jsonData = window.localStorage.getItem(WISHLIST_KEY);
    if (jsonData !== null) items = Array.from<WishlistItem>(JSON.parse(jsonData));
    } catch (error) {
      console.warn('Unable to get data from localStorage or parse json string');
    }
  return items;
}

function store(data: WishlistItem[]) {
  try {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(data));
  } catch(error) {
    console.warn('Unable to store json to localStorage');
  }
}