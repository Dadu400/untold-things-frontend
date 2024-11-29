function PostButton({ location }: { location: 'header' | 'burger-menu' }) {
    return (
        <button
            className={`${
                location === 'header'
                    ? 'hidden lg:flex'
                    : 'flex lg:hidden'
            } font-bpg px-6 py-2 bg-main text-white rounded-xl`}
        >
            დაპოსტე
        </button>
    );
}

export default PostButton;
