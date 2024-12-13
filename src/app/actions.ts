'use server'

const FAVORITES_KEY = 'favorites'
type FavoriteResult = { result: 'added' | 'removed' };

export async function toggleFavorite(productId: number): Promise<FavoriteResult> {
    const favoritesRaw = localStorage.getItem(FAVORITES_KEY);
    const favorites = favoritesRaw !== null ? Array.from(JSON.parse(favoritesRaw)) : [];
    const hasProduct = favorites.includes(productId)

    // toggle productId
    if (!hasProduct) favorites.push(productId);
    else favorites.splice(productId, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    return { result: !hasProduct ? 'added' : 'removed' };
}