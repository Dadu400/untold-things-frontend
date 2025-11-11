import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Product } from "../../types/types";
import { motion } from "framer-motion";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloseIcon from '@mui/icons-material/Close';

const ProductOrderPopup = ({ products, setIsOrderOpen } : { products: Product[], setIsOrderOpen: (isOpen: boolean) => void }) => {
    const { getCartItems } = useCart();

    const [orderForm, setOrderForm] = useState<{
        size: string;
        phone: string;
        address: string;
        city: string;
    }>({
        size: '',
        phone: '',
        address: '',
        city: ''
    });

    const subtotal = getCartItems().reduce((acc, item) => {
        const product = products.find((p) => p.id === item.productId)
        return product ? acc + product.price * item.quantity : acc
    }, 0);

    const shipping = subtotal > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    const sizes = ['S', 'M', 'L', 'XL'];

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('შეკვეთა წარმატებით გაფორმდა!');
        setIsOrderOpen(false);
    };

    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOrderOpen(false)} 
                className="fixed inset-0 bg-black/50 z-[55]"
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-[90%] max-w-[1200px] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 pointer-events-auto"
                >
                    <div className="bg-gray-50 p-8 overflow-y-auto border-r border-gray-200">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 font-bpg">
                                <Inventory2Icon className="text-[#D93835]" />
                                შეჯამება
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4 mb-6">
                            {getCartItems().map(item => {
                                const product = products.find((p) => p.id === Number(item.productId));
                                if (!product) return null;
                            
                                return (
                                    <motion.div 
                                        key={product.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-lg p-4 shadow-sm"
                                    >
                                        <div className="flex gap-4">
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.name} 
                                                className="w-20 h-20 object-cover rounded-lg" 
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 mb-1 font-bpg">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-2 font-bpg">
                                                    რაოდენობა: {item.quantity}
                                                </p>
                                                <p className="text-lg font-bold text-[#D93835]">
                                                    {(product.price * item.quantity).toFixed(2)}₾
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="h-px bg-gray-200 my-6" />

                        <div>
                            <div className="flex justify-between text-gray-600 mb-3 font-bpg">
                                <span>ჯამი</span>
                                <span className="font-medium">{subtotal.toFixed(2)}₾</span>
                            </div>
                            <div className="flex justify-between text-gray-600 mb-3 font-bpg">
                                <div className="flex items-center gap-2">
                                    <LocalShippingIcon className="text-gray-600" sx={{ fontSize: 18 }} />
                                    <span>მიწოდება</span>
                                </div>
                                <span className="font-medium">{shipping.toFixed(2)}₾</span>
                            </div>
                            <div className="h-px bg-gray-200 my-3" />
                            <div className="flex justify-between text-xl font-bold text-gray-900 font-bpg">
                                <span>სულ</span>
                                <span className="text-[#D93835]">{total.toFixed(2)}₾</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 overflow-y-auto relative">
                        <button
                            onClick={() => setIsOrderOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <CloseIcon className="text-gray-500" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold font-bpg">
                                მიწოდების დეტალები
                            </h2>
                            <p className="text-sm text-gray-600 mt-2 font-bpg">
                                გთხოვთ შეავსოთ თქვენი ინფორმაცია შეკვეთის დასასრულებლად
                            </p>
                        </div>

                        <form onSubmit={handleOrderSubmit} className="flex flex-col gap-6">
                            <div>
                                <label className="block text-base font-semibold mb-3 font-bpg">
                                    ზომა <span className="text-[#D93835]">*</span>
                                </label>
                                <div className="grid grid-cols-4 gap-3">
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setOrderForm({...orderForm, size})}
                                            className={`h-12 rounded-lg border-2 font-semibold text-base transition-all ${
                                                orderForm.size === size
                                                    ? 'border-[#D93835] bg-[#D93835] text-white'
                                                    : 'border-gray-300 bg-white text-gray-700 hover:border-[#D93835] hover:text-[#D93835]'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2 font-bpg">
                                    გთხოვთ აირჩიოთ ზომა
                                </p>
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-2 font-bpg">
                                    ტელეფონის ნომერი <span className="text-[#D93835]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+995 XXX XX XX XX"
                                    value={orderForm.phone}
                                    onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                                    className="w-full h-12 px-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D93835] focus:border-transparent font-bpg"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-2 font-bpg">
                                    მისამართი <span className="text-[#D93835]">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="ქუჩის მისამართი"
                                    value={orderForm.address}
                                    onChange={e => setOrderForm({...orderForm, address: e.target.value})}
                                    className="w-full h-12 px-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D93835] focus:border-transparent font-bpg"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-2 font-bpg">
                                    ქალაქი <span className="text-[#D93835]">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="თქვენი ქალაქი"
                                    value={orderForm.city}
                                    onChange={e => setOrderForm({...orderForm, city: e.target.value})}
                                    className="w-full h-12 px-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#D93835] focus:border-transparent font-bpg"
                                />
                            </div>

                            <div className="pt-6 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={!orderForm.size}
                                    className="w-full bg-[#D93835] hover:bg-[#c22f2c] text-white h-14 rounded-xl border-none text-lg font-semibold cursor-pointer transition-colors font-bpg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    შეკვეთის გაფორმება - {total.toFixed(2)}₾
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOrderOpen(false)}
                                    className="w-full bg-transparent text-gray-700 h-12 rounded-xl border border-gray-300 text-base font-medium cursor-pointer hover:bg-gray-50 transition-colors font-bpg"
                                >
                                    გაუქმება
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default ProductOrderPopup;