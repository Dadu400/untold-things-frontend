import {Link} from "react-router-dom";

function PostButton({ className }: { className?: string }) {
    return (
        <button
            className={`${className} font-dejavu px-6 py-2 bg-[#D93835] text-white rounded-xl tracking-widest`}>
            <Link to="/submit">დაპოსტე</Link>
        </button>
    );
}

export default PostButton;
