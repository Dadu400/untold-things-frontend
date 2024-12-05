function PostButton({ className }: { className?: string }) {
    return (
        <button
            className={`${className} font-firago px-6 py-2 bg-[#D93835] text-white rounded-xl tracking-widest`}
        >
            დაპოსტე
        </button>
    );
}

export default PostButton;
