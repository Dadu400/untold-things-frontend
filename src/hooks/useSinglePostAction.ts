import { useState, useEffect } from "react";

import { toggleLikePost, sharePost } from "../api/posts";

export const useSinglePostActions = (
  id: number,
  initialLikes: number,
  initialShares: number,
  initialLiked: boolean
) => {
  const [liked, setLiked] = useState(() => {
    const storedLiked = localStorage.getItem(`post_${id}_liked`);
    return storedLiked !== null ? JSON.parse(storedLiked) : initialLiked;
  });

  const [likeCount, setLikeCount] = useState(initialLikes);
  const [shareCount, setShareCount] = useState(initialShares);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(`post_${id}_liked`, JSON.stringify(liked));
  }, [liked, id]);

  const toggleLike = async () => {
    const nextLikedState = !liked;
    const nextLikeCount = liked ? likeCount - 1 : likeCount + 1;

    setLiked(nextLikedState);
    setLikeCount(nextLikeCount);
    localStorage.setItem(`post_${id}_liked`, JSON.stringify(nextLikedState));

    try {
      await toggleLikePost(id, liked);
    } catch (error) {
      setLiked(liked);
      setLikeCount(likeCount);
      localStorage.setItem(`post_${id}_liked`, JSON.stringify(liked));
    }
  };

  const sharePostHandler = async () => {
    try {
      await sharePost(id);
      setShareCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error sharing post:", error);
    }
    setIsModalOpen(false);
  };

  return {
    liked,
    likeCount,
    shareCount,
    isModalOpen,
    setIsModalOpen,
    toggleLike,
    sharePost: sharePostHandler,
  };
};
