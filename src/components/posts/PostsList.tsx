import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SinglePost from "./SinglePost";
import TypedText from "./TypedText";
import { useNavigate } from "react-router-dom";

import NoPostsAvailable from "./NoPostsAvailable";

gsap.registerPlugin(ScrollTrigger);

type Post = {
    id: number;
    messageTo: string;
    message: string;
    timestamp: string;
    likes: number;
    shares: number;
    messageStatus: string;
};

type PostsListProps = {
    posts: Post[];
};

const PostsList: React.FC<PostsListProps> = ({ posts }) => {
    const postsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.context(() => {
            const postElements = document.querySelectorAll(".single-post");
            gsap.set(postElements, { opacity: 0, y: 50 });

            ScrollTrigger.batch(postElements, {
                start: "top 90%",
                onEnter: (batch) =>
                    gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, duration: 1 }),
            });
        }, postsRef);
    }, [posts]);


    const handleLike = (id: number, liked: boolean) => {
        console.log(`Post ${id} liked: ${liked}`);
    };

    const handleShare = (id: number) => {
        console.log(`Post ${id} shared`);
    };

    const navigateToPost = (id: number) => navigate(`/post/${id}`);

    if (!posts.length) {
        return <NoPostsAvailable />
    }

    return (
        <section ref={postsRef} className="w-[90%] md:w-[85%] flex flex-col mx-auto my-10">
            <TypedText />
            <div className="container grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 gap-y-12 mt-10 place-items-center">
                {posts.map((post) => (
                    <SinglePost
                        key={post.id}
                        className="single-post"
                        id={post.id}
                        messageTo={post.messageTo}
                        message={post.message}
                        time={new Date(post.timestamp).toLocaleString()}
                        likes={post.likes}
                        shares={post.shares}
                        status={post.messageStatus}
                        liked={false}
                        onLike={() => handleLike(post.id, true)}
                        onShare={() => handleShare(post.id)}
                        onClick={() => navigateToPost(post.id)}
                        disabled={false}
                    />
                ))}
            </div>
        </section>
    );
};

export default PostsList;
