import React, { useState, useEffect } from "react";

import ShareIcon from "@mui/icons-material/Share";

import ShareDialog from "./ShareDialog";
import UserIcon from "../../assets/icons/user.svg";

import { SinglePostProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import AnimatedHeartButton from "./AnimatedHeartButton";


function SinglePost({ id, messageTo, message, timestamp, likes, shares, messageStatus, liked: initialLiked, className, disabled }: SinglePostProps) {
    const navigate = useNavigate();

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

    const isInteractionDisabled = messageStatus === "PENDING" || messageStatus === "REJECTED";

    const handlePostClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled || isInteractionDisabled) return;

        try {
            sessionStorage.setItem('postsListScrollY', String(window.scrollY));
        } catch (_) {
        }
        navigate(`/post/${id}`, { state: { fromList: true } })
    };

    const handleLikeClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled || isInteractionDisabled) return;

        const nextLikedState = !liked;
        setLiked(nextLikedState);
        setLikeCount((prev) => (nextLikedState ? prev + 1 : prev - 1));

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/v1/messages/${id}/${nextLikedState ? "like" : "unlike"}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ postId: id }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            localStorage.setItem(`post_${id}_liked`, JSON.stringify(nextLikedState));
        } catch (error) {
            console.error("Error toggling like state:", error);
            setLiked(liked);
            setLikeCount(likeCount);
        }
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled || isInteractionDisabled) return;
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

        setShareCount((shareCount) => shareCount + 1);
        setIsModalOpen(false);
    };

    return (
        <div className={`w-[300px] h-[410px] relative mx-auto bg-gray-100 dark:bg-[#1f1f1f] flex flex-col rounded-2xl overflow-hidden shadow-lg ${className}`}>
            <div className="bg-[#f6f6f7] dark:bg-[#1f1f1f] border-b border-b-gray-300 dark:border-b-gray-600 px-4 py-5 flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <img src={UserIcon} alt="User" className="w-12 h-12 rounded-full" />
                    <span className="text-sm">{messageTo}</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <div className="flex flex-col items-center gap-1">
                        <AnimatedHeartButton
                            active={liked} 
                            onClick={handleLikeClick}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-300">{likeCount}</span>
                    </div>
                    <button
                        className="flex flex-col items-center cursor-pointer"
                        onClick={handleShareClick}
                    >
                        <ShareIcon style={{ color: "#0078FE" }} />
                        <span className="text-xs text-gray-500 dark:text-gray-300">{shareCount}</span>
                    </button>
                </div>
            </div>
            <div 
                className="flex flex-col items-center pb-32 p-2 cursor-pointer"
                onClick={handlePostClick}
                role="button"
                aria-label={`View message to ${messageTo}`}
            >
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