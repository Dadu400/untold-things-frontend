import React, { useState, useEffect } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import ShareDialog from "./ShareDialog";
import UserIcon from "../../assets/icons/user.svg";



export interface SinglePostProps {
    id: number;
    messageTo: string;
    message: string;
    timestamp: number;
    likes: number;
    shares: number;
    liked: boolean;
    status: string;
    onLike: (id: number, liked: boolean) => void;
    onShare: () => void;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

function SinglePost({ id, messageTo, message, timestamp, likes, shares, liked: initialLiked, onShare, onClick, className, disabled }: SinglePostProps) {

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Tbilisi",
        }).format(date);
    };

    const getInitialLikedState = () => {
        const storedLiked = localStorage.getItem(`post_${id}_liked`);
        return storedLiked !== null ? JSON.parse(storedLiked) : initialLiked;
    };

    const [liked, setLiked] = useState(getInitialLikedState());
    const [likeCount, setLikeCount] = useState(likes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shareCount, setShareCount] = useState(shares);

    useEffect(() => {
        localStorage.setItem(`post_${id}_liked`, JSON.stringify(liked));
    }, [liked, id]);

    const handlePostClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
        onClick();
    };

    const handleLikeClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled) return;

        const nextLikedState = !liked;
        const nextLikeCount = liked ? likeCount - 1 : likeCount + 1;

        setLiked(nextLikedState);
        setLikeCount(nextLikeCount);
        localStorage.setItem(`post_${id}_liked`, JSON.stringify(nextLikedState));

        const url = `${process.env.REACT_APP_API_URL}/v1/messages/${id}/${liked ? "unlike" : "like"}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId: id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error toggling like state:", error);

            setLiked(liked);
            setLikeCount(likeCount);
            localStorage.setItem(`post_${id}_liked`, JSON.stringify(liked));
        }
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.preventDefault();
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
        <div className={`w-[300px] h-[410px] mx-auto bg-gray-100 dark:bg-[#1f1f1f] flex flex-col rounded-2xl overflow-hidden shadow-lg ${className}`}>
            <a
                href={`/post/${id}`}
                className="flex flex-col h-full cursor-pointer"
                onClick={handlePostClick}
                role="article"
                aria-label={`View message to ${messageTo}`}
            >
                <div className="bg-[#f6f6f7] dark:bg-[#1f1f1f] border-b border-b-gray-300 dark:border-b-gray-600 px-4 py-5 flex items-center">
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        <img src={UserIcon} alt="User" className="w-12 h-12 rounded-full" />
                        <span className="text-sm">{messageTo}</span>
                    </div>
                    <div className="ml-auto flex gap-2">
                        <button
                            className="flex flex-col items-center cursor-pointer"
                            onClick={handleLikeClick}
                        >
                            {liked && !disabled ? (
                                <FavoriteIcon style={{ color: "#0078FE" }} />
                            ) : (
                                <FavoriteBorderIcon style={{ color: "#0078FE" }} />
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-300">{likeCount}</span>
                        </button>
                        <button
                            className="flex flex-col items-center cursor-pointer"
                            onClick={handleShareClick}
                        >
                            <ShareIcon style={{ color: "#0078FE" }} />
                            <span className="text-xs text-gray-500 dark:text-gray-300">{shareCount}</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center mb-32 p-2">
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Message</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(timestamp)}</span>
                    </div>
                    <div className="flex flex-col self-end max-w-[240px] mt-3 mr-2 gap-1">
                        <div className="flex self-end">
                            <span className="word-break bg-[#248bf5] p-2 text-sm leading-normal rounded-xl text-white text-wrap">
                                {message}
                            </span>
                        </div>
                        <p className="flex items-center text-gray-500 dark:text-gray-400 self-end text-xs font-semibold">
                            Delivered
                        </p>
                    </div>
                </div>
            </a>
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