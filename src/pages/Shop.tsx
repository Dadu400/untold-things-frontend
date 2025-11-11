import ProductHero from "../components/shop/ProductHero";
import ProductPromo from "../components/shop/ProductPromo";
import ProductSection from "../components/shop/ProductSection";

import { fetchProducts } from "../api/products";
import { useEffect, useState } from "react";
import FloatingCardButton from "../components/shop/FloatingCardButton";
import ProductCartDrawer from "../components/shop/ProductCartDrawer";
import { useCart } from "../context/CartContext";
import { AnimatePresence } from "framer-motion";
import ProductOrderPopup from "../components/shop/ProductOrderPopup";

function Shop() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const { getCartCount, addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  const onAddToCart = (productId: number) => {
    addToCart(productId, 1);
    setIsCartOpen(true);
  }

  return (
    <main>
        <ProductHero />
        <section className="max-w-7xl mx-auto px-6 py-12">
          <ProductSection products={products} addToCart={onAddToCart} />
          <ProductPromo />
          <FloatingCardButton setIsCartOpen={setIsCartOpen} cartCount={getCartCount()} />
          <AnimatePresence>
            {isCartOpen && (<ProductCartDrawer products={products} setIsCartOpen={setIsCartOpen} setIsOrderFormOpen={setIsOrderFormOpen} />)}
            {isOrderFormOpen && (<ProductOrderPopup products={products} setIsOrderOpen={setIsOrderFormOpen} />)}
          </AnimatePresence>
        </section>
    </main>
  );
}

export default Shop;