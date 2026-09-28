import React, { useState, useEffect } from "react";

import ShareIcon from "@mui/icons-material/Share";

import ShareCardDialog from "../share/ShareCardDialog";
import UserIcon from "../../assets/icons/user.svg";

import { SinglePostProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import AnimatedHeartButton from "./AnimatedHeartButton";


function SinglePost({ id, messageTo, message, timestamp, likes, messageStatus, liked: initialLiked, className, disabled }: SinglePostProps) {
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

    const formatDisplayTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const currentYear = new Date().getFullYear();
        const messageYear = date.getFullYear();

        if (messageYear < currentYear) {
            return new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Tbilisi",
            }).format(date).replace(",", "").replace(" at", ", at");
        }

        return formatTime(timestamp);
    };

    const getInitialLikedState = () => {
        const storedLiked = localStorage.getItem(`post_${id}_liked`);
        return storedLiked !== null ? JSON.parse(storedLiked) : initialLiked;
    };

    const [liked, setLiked] = useState(getInitialLikedState());
    const [likeCount, setLikeCount] = useState(likes);
    const [isShareOpen, setIsShareOpen] = useState(false);

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
        setIsShareOpen(true);
    };

    return (
        <article className={`group relative mx-auto w-full max-w-[340px] flex flex-col rounded-[28px] bg-surface border border-line/70 shadow-card overflow-hidden transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-card-hover ${className ?? ""}`}>
            <header className="relative bg-surface-muted border-b border-line px-4 py-3.5 flex flex-col items-center">
                <img src={UserIcon} alt="" className="w-12 h-12 rounded-full" />
                <span className="mt-1 max-w-[55%] truncate font-read text-[15px] font-medium leading-snug text-ink">{messageTo}</span>
                <div className="absolute inset-y-0 right-2 flex items-center">
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col items-center">
                            <AnimatedHeartButton
                                active={liked} 
                                onClick={handleLikeClick}
                            />
                            {/* no count at zero; the slot stays so the heart doesn't shift on the first like */}
                            <span className={`-mt-1 text-xs tabular-nums text-muted ${likeCount > 0 ? "" : "invisible"}`} aria-hidden={likeCount > 0 ? undefined : true}>{likeCount}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                className="flex items-center justify-center w-12 h-11 rounded-full text-muted transition-colors duration-200 [@media(hover:hover)]:hover:bg-ink/[0.05] [@media(hover:hover)]:hover:text-ink/70 active:bg-ink/[0.08]"
                                onClick={handleShareClick}
                                aria-label="Share as image"
                            >
                                {/* two of the glyph's three nodes sit on the right; nudge left to centre its visual weight */}
                                <ShareIcon className="-translate-x-px" style={{ fontSize: 20 }} />
                            </button>
                            {/* mirrors the like count so both columns share the same geometry */}
                            <span className="-mt-1 text-xs invisible" aria-hidden="true">0</span>
                        </div>
                    </div>
                </div>
            </header>
            <div 
                // inset ring: an outer outline would be clipped by the card's overflow-hidden
                className="flex-1 flex flex-col px-4 pt-3 pb-10 cursor-pointer rounded-b-[27px] focus-visible:-outline-offset-4"
                onClick={handlePostClick}
                onKeyDown={(e) => { if (e.key === "Enter") (e.currentTarget as HTMLElement).click(); }}
                role="button"
                tabIndex={0}
                aria-label={`View message to ${messageTo}`}
            >
                <div className="flex flex-col items-center leading-tight">
                    <span className="text-[11px] font-medium tracking-wide text-muted">Message</span>
                    <span className="text-[11px] tabular-nums text-muted">{formatDisplayTime(timestamp)}</span>
                </div>
                <div className="flex flex-col self-end max-w-[88%] mt-4 mr-1 gap-1">
                    <p className="imessage-bubble word-break whitespace-pre-line font-read text-[16px] leading-[1.55] text-white">
                        {message}
                    </p>
                    <p className="self-end mr-0.5 text-[11px] font-semibold text-muted">
                        Delivered
                    </p>
                </div>
            </div>
            <ShareCardDialog
                open={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                message={message}
                messageTo={messageTo}
            />
        </article>
    );
}

export default SinglePost;