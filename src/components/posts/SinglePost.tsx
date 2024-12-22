import React, { FC, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShareDialog from "./ShareDialog";

interface SinglePostProps {
    recipient: string;
    message: string;
    time: string;
    likes: number;
    shares: number;
    liked: boolean;
    onLike: () => void;
    onShare: () => void;
    onClick: () => void;
    className?: string;
}

const SinglePost: FC<SinglePostProps> = ({recipient, message, time, likes, shares, liked, onLike, onShare, onClick, className,}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shareCount, setShareCount] = useState(shares);

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleSharePost = () => {
        setShareCount((prev) => prev + 1);
        onShare();
        setIsModalOpen(false);
    };

    return (
        <div onClick={onClick}
            className={`w-[300px] mx-auto h-[400px] bg-gray-100 flex flex-col rounded-2xl overflow-hidden shadow-lg cursor-pointer ${className}`}>
            <div className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-end gap-x-12">
                <div className="flex flex-col items-center">
                    <AccountCircleIcon fontSize="large" style={{ color: "#999999" }} />
                    <span className="text-sm">{recipient}</span>
                </div>
                <div className="flex gap-2">
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike();
                        }}
                    >
                        {liked ? (
                            <FavoriteIcon style={{ color: "#0078FE" }} />
                        ) : (
                            <FavoriteBorderIcon style={{ color: "#0078FE" }} />
                        )}
                        <span className="text-xs text-gray-500">{likes}</span>
                    </div>
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={handleShareClick}
                    >
                        <ShareIcon style={{ color: "#0078FE" }} />
                        <span className="text-xs text-gray-500">{shareCount}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mb-32 p-2">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 font-medium">Message</span>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
                <div className="flex flex-col self-end max-w-[240px] mt-3 mr-2 gap-1">
                    <div className="flex self-end">
                        <span className="word-break bg-[#248bf5] p-2 text-sm leading-normal rounded-xl text-white text-wrap">
                            {message}
                        </span>
                    </div>
                    <p className="flex items-center text-gray-500 self-end text-xs font-semibold">
                        Delivered
                    </p>
                </div>
            </div>
            <ShareDialog
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onSharePost={handleSharePost}
            />
        </div>
    );
};

export default SinglePost;
