import { Product } from "../../types/types";

function ProductCartItem({
  product,
  quantity,
  removeItem,
  updateQuantity,
}: {
  product: Product;
  quantity: number;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}) {
  return (
    <div className="flex gap-4 bg-gray-50 rounded-xl p-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 font-dejavu tracking-wider text-lg">{product.name}</h3>
        <p className="text-xl font-bold text-[#D93835] mb-3">{product.price}₾</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>

            <span className="w-8 text-center font-medium">{quantity}</span>

            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={() => removeItem(product.id)}
            className="text-red-500 text-sm underline hover:text-red-600 transition"
          >
            წაშლა
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;