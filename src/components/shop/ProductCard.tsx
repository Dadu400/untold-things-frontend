import { Product } from "../../types/types";
import { useState } from "react";

function ProductCard({ product, addToCart }: { product: Product, addToCart: (product: Product) => void }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      key={product.id} 
      className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 font-dejavu tracking-wider">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            {product.price}₾
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#D93835] text-white px-6 py-3 rounded-lg border-none text-sm font-semibold cursor-pointer flex items-center gap-2 hover:bg-[#c22f2c] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            დამატება
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;