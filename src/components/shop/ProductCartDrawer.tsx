import { Product } from "../../types/types";
import ProductCartItem from "./ProductCartItem";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";

function ProductCartDrawer({ products, setIsCartOpen }: { products: Product[]; setIsCartOpen: (isOpen: boolean) => void }) {
  const { getCartItems, removeFromCart, updateQuantity } = useCart();
  
  const subtotal = getCartItems().reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId)
    return product ? acc + product.price * item.quantity : acc
  }, 0);

  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  const cartLength = getCartItems().length;

  const setIsOrderOpen = (isOpen: boolean) => {
    // order open logic
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 z-40"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-[448px] bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-[#D93835]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 font-dejavu">კალათა ({cartLength})</h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartLength === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg font-medium text-gray-500 mb-2">შენი კალათა ცარიელია</p>
              <p className="text-sm text-gray-400">დაამატე პროდუქტი დასაწყებად!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {getCartItems().map(({ productId, quantity }) => {
                const product = products.find((p) => p.id === Number(productId));
                if (!product) return null;

                return <ProductCartItem key={product.id} product={product} quantity={quantity} removeItem={removeFromCart} updateQuantity={updateQuantity} />;
              })}
            </div>
          )}
        </div>

        {cartLength > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="mb-4">
              <div className="flex justify-between text-gray-500 mb-2 font-bpg">
                <span>ჯამი</span>
                <span>{subtotal.toFixed(2)}₾</span>
              </div>

              <div className="flex justify-between text-gray-500 mb-2 font-bpg">
                <span>მიწოდება</span>
                <span className="font-medium">{shipping.toFixed(2)}₾</span>
              </div>

              <div className="h-px bg-gray-200 my-3"></div>

              <div className="flex justify-between text-xl font-bold text-gray-900 font-bpg">
                <span>სულ</span>
                <span>{total.toFixed(2)}₾</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsOrderOpen(true);
              }}
              className="w-full bg-[#D93835] text-white py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
            >
              შეკვეთის გაფორმება
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default ProductCartDrawer;