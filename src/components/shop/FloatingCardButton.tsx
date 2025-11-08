import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function FloatingCardButton({ setIsCartOpen, cartCount }: { setIsCartOpen: (isOpen: boolean) => void, cartCount: number }) {
  return (
    <div className="fixed bottom-8 right-8 z-30">
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative bg-[#D93835] hover:bg-[#B82E2B] text-white w-16 h-16 rounded-full border-none cursor-pointer shadow-2xl flex items-center justify-center transition-all duration-300"
      >
        <ShoppingCartIcon sx={{ fontSize: 20 }} />

        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-white text-[#D93835] border-2 border-[#D93835] min-w-8 h-6 rounded-full flex items-center justify-center text-xs font-bold">
            {cartCount}
          </div>
        )}
      </button>
    </div>
  );
}

export default FloatingCardButton;