export const fetchProducts = async () => {
    try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/v1/products`
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}