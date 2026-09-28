import { Link } from "react-router-dom";
import { PostButtonProps } from "../../types/types";

function PostButton({ className, onClick }: PostButtonProps) {
    return (
        <Link
            to="/submit"
            onClick={onClick}
            className={`${className} items-center justify-center h-10 font-dejavu px-6 bg-brand text-white rounded-full tracking-widest shadow-cta transition-[background-color,transform] duration-200 hover:bg-brand-hover active:scale-[0.97]`}
        >
            დაპოსტე
        </Link>
    );
}

export default PostButton;
