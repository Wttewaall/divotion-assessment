export async function getProducts() {
    // Call an external API endpoint to get posts
    const res = await fetch(`${process.env.API_URL}/${process.env.API_PRODUCTS}`);
    const products = await res.json();
    return products;
  }