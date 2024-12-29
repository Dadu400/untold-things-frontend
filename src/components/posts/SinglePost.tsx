import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShareDialog from "./ShareDialog";
import { useNavigate } from "react-router-dom";

export interface SinglePostProps {
    id: number;
    messageTo: string;
    message: string;
    time: string;
    likes: number;
    shares: number;
    liked: boolean;
    onLike: (id: number, liked: boolean) => void;
    onShare: () => void;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

function SinglePost({ id, messageTo, message, time, likes, shares, liked: initialLiked, onShare, onClick, className, disabled }: SinglePostProps) {
    const getInitialLikedState = () => {
        const storedLiked = localStorage.getItem(`post_${id}_liked`);
        return storedLiked !== null ? JSON.parse(storedLiked) : initialLiked;
    };

    const [liked, setLiked] = useState(getInitialLikedState());
    const [likeCount, setLikeCount] = useState(likes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shareCount, setShareCount] = useState(shares);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem(`post_${id}_liked`, JSON.stringify(liked));
    }, [liked, id]);

    const handlePostClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        navigate(`/post/${id}`);
        onClick();
    };

    const handleLikeClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;

        const url = `${process.env.REACT_APP_API_URL}/v1/messages/${id}/${liked ? "unlike" : "like"}`;
        const method = liked ? "DELETE" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId: id }),
            });

            if (!response.ok) {
                new Error(`HTTP error! status: ${response.status}`);
            }

            setLiked(!liked);
            setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
            localStorage.setItem(`post_${id}_liked`, JSON.stringify(!liked));
        } catch (error) {
            console.error("Error toggling like state:", error);
        }
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (disabled) return;
        setIsModalOpen(true);
    };

    const handleSharePost = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/v1/messages/${id}/share`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId: id }),
            });
        } catch (error) {
            console.error("Error sharing post:", error);
        }

        setShareCount((prev) => prev + 1);
        onShare();
        setIsModalOpen(false);
    };
    return (
        <div onClick={handlePostClick} className={`w-[300px] mx-auto h-[400px] bg-gray-100 flex flex-col rounded-2xl overflow-hidden shadow-lg cursor-pointer ${className}`}>
            <div className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-end gap-x-12">
                <div className="flex flex-col items-center">
                    <AccountCircleIcon fontSize="large" style={{ color: "#999999" }} />
                    <span className="text-sm">{messageTo}</span>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-center cursor-pointer"
                        onClick={handleLikeClick} >
                        {liked && !disabled ? (
                            <FavoriteIcon style={{ color: "#0078FE" }} />
                        ) : (
                            <FavoriteBorderIcon style={{ color: "#0078FE" }} />
                        )}
                        <span className="text-xs text-gray-500">{likeCount}</span>
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
                shareUrl={`https://racvergitxari.ge/post/${id}`}
                shareMessage={`უთქმელი სიტყვები ${messageTo}ს: "${message}"`}
            />
        </div>
    );
}

export default SinglePost;
