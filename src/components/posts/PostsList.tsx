import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SinglePost from "./SinglePost";
import TypedText from "./TypedText";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const PostsList = () => {
    const postsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [posts, setPosts] = useState(
        Array.from({ length: 30 }).map((_, index) => ({
            id: index,
            author: `Author ${index + 1}`,
            message: `Message content for post ${index + 1}`,
            time: `Today 12:${index}PM`,
            likes: Math.floor(Math.random() * 100),
            shares: Math.floor(Math.random() * 20),
            liked: false,
        }))
    );

    useEffect(() => {
        gsap.context(() => {
            const posts = document.querySelectorAll(".single-post");
            gsap.set(posts, { opacity: 0, y: 50 });

            ScrollTrigger.batch(posts, {
                start: "top 90%",
                onEnter: (batch) =>
                    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, duration: 1 }),
            });
        }, postsRef);
    }, []);

    const handleLike = (id: number) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id
                    ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
                    : post
            )
        );
    };

    const handleShare = (id: number) => {
        setPosts((prev) =>
            prev.map((post) => (post.id === id ? { ...post, shares: post.shares + 1 } : post))
        );
        alert("Post shared!");
    };

    const navigateToPost = (id: number) => {
        navigate(`/post/${id}`);
    };

    return (
        <section ref={postsRef} className="w-[90%] md:w-[85%] flex flex-col mx-auto my-20">
            <TypedText />
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mt-10 place-items-center">
                {posts.map((post) => (
                    <SinglePost
                        key={post.id}
                        className="single-post"
                        author={post.author}
                        message={post.message}
                        time={post.time}
                        likes={post.likes}
                        shares={post.shares}
                        liked={post.liked}
                        onLike={() => handleLike(post.id)}
                        onShare={() => handleShare(post.id)}
                        onClick={() => navigateToPost(post.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default PostsList;
