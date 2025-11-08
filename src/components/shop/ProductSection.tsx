
import { useState } from "react";
import { Product } from "../../types/types";
import ProductCard from "./ProductCard";


function ProductSection({ products, addToCart } : { products: Product[], addToCart: (productId: number) => void }) {
    const [selectedCategory, setSelectedCategory] = useState('ყველა');
    
    const filteredProducts = selectedCategory === 'ყველა' 
    ? products 
    : products.filter(p => p.category === selectedCategory);
    
    return (
        <div>
          <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-dejavu tracking-wider">
                ჩვენი პროდუქცია
              </h2>
              <p className="text-gray-500">
                ხელმისაწვდომია {filteredProducts.length} პროდუქტი
              </p>
            </div>
            
            <div className="flex gap-3 items-center flex-wrap">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {['ყველა', 'ტანსაცმელი', 'აქსესუარები'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer capitalize transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#D93835] text-white border-none' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
          </div>
    );
}

export default ProductSection;