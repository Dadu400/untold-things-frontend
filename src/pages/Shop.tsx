import ProductHero from "../components/shop/ProductHero";
import ProductPromo from "../components/shop/ProductPromo";
import ProductSection from "../components/shop/ProductSection";

import { fetchProducts } from "../api/products";
import { useEffect, useState } from "react";
import FloatingCardButton from "../components/shop/FloatingCardButton";

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <main>
        <ProductHero />
        <section className="max-w-7xl mx-auto px-6 py-12">
          <ProductSection products={products} />
          <ProductPromo />
          <FloatingCardButton setIsCartOpen={() => {}} cartCount={1} />
        </section>
    </main>
  );
}

export default Shop;