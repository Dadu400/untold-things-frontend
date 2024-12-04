function PostButton({ location }: { location: 'header' | 'burger-menu' }) {
    return (
        <button
            className={`${
                location === 'header'
                    ? 'hidden lg:flex'
                    : 'flex lg:hidden'
            } font-firago px-6 py-2 bg-[#D93835] text-white rounded-xl`}
        >
            დაპოსტე
        </button>
    );
}

export default PostButton;
