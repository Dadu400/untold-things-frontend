import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SinglePost from "./SinglePost";
import TypedText from "./TypedText";
import NoPostsAvailable from "./NoPostsAvailable";

import { PostsListProps } from "../../types/types";
import Loader from "../loader/Loader";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    posts: PostsListProps["posts"];
    loading: boolean;
    error: string | null;
}

function PostsList({ posts, loading, error }: Props) {
    const postsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (posts.length === 0) return;

        const context = gsap.context(() => {
            const postElements = postsRef.current?.querySelectorAll(".single-post");

            if (postElements && postElements.length > 0) {
                gsap.set(postElements, { opacity: 0, y: 50 });

                ScrollTrigger.batch(postElements, {
                    start: "top 90%",
                    onEnter: (batch) =>
                        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.2, duration: 1 }),
                });
            }
        }, postsRef);

        return () => {
            context.revert();
        };
    }, [posts]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <NoPostsAvailable />;
    }

    if (!posts.length) {
        return <NoPostsAvailable />;
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
                        timestamp={post.timestamp}
                        likes={post.likes}
                        shares={post.shares}
                        messageStatus={post.messageStatus}
                        liked={false}
                        disabled={false}
                    />
                ))}
            </div>
        </section>
    );
}

export default PostsList;
