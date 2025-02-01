import { Link } from "react-router-dom";
import { PostButtonProps } from "../../types/types";

function PostButton({ className, onClick }: PostButtonProps) {
    return (
        <Link to="/submit" onClick={onClick}>
            <button
                className={`${className} font-dejavu px-6 py-2 bg-[#D93835] text-white rounded-xl tracking-widest`}
            >
                დაპოსტე
            </button>
        </Link>
    );
}

export default PostButton;