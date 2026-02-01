import React from "react";
import { Link } from "react-router-dom";
import { PostButtonProps } from "../../types/types";

// Temporary flag to disable posting
const POSTING_DISABLED = true;

function PostButton({ className, onClick }: PostButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        if (POSTING_DISABLED) {
            e.preventDefault();
            return;
        }
        onClick?.();
    };

    return (
        <Link to="/submit" onClick={handleClick}>
            <button
                className={`${className} font-dejavu px-6 py-2 ${POSTING_DISABLED ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D93835]'} text-white rounded-xl tracking-widest`}
                disabled={POSTING_DISABLED}
            >
                დაპოსტე
            </button>
        </Link>
    );
}

export default PostButton;