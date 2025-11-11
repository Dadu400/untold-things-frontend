import { motion } from "framer-motion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const OrderSuccessPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    if (!isOpen) return null;

    return (
        <>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose} 
                className="fixed inset-0 bg-black/50 z-[70]"
            />
            
            <div className="fixed inset-0 flex items-center justify-center z-[75] pointer-events-none p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                >
                    <div className="relative p-8 text-center">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                        >
                            <CloseIcon className="text-gray-500" />
                        </button>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
                            className="flex justify-center mb-6"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircleIcon 
                                    className="text-green-600" 
                                    sx={{ fontSize: 48 }} 
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 font-bpg">
                                შეკვეთა წარმატებით გაფორმდა!
                            </h2>
                            <p className="text-gray-600 mb-6 font-bpg leading-relaxed">
                                თქვენი შეკვეთა მიღებულია და მალე დაგიკავშირდებით მითითებულ ნომერზე.
                            </p>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            onClick={onClose}
                            className="w-full bg-[#D93835] hover:bg-[#c22f2c] text-white h-12 rounded-xl font-semibold transition-colors font-bpg"
                        >
                            კარგი
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default OrderSuccessPopup;