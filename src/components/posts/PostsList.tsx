import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SinglePost from "./SinglePost";
import TypedText from "./TypedText";
import NoPostsAvailable from "./NoPostsAvailable";

import { PostListsProps } from "../../types/types";

import Spinner from "../loader/Spinner";
import Loader from "../loader/Loader";

gsap.registerPlugin(ScrollTrigger);

function PostsList({ posts, fetchNextPage, hasNextPage, loading, isInitialLoading }: PostListsProps) {
    const postsRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (posts.length === 0) return;

        const context = gsap.context(() => {
            const postElements = postsRef.current?.querySelectorAll(".single-post");

            if (postElements && postElements.length > 0) {
                postElements.forEach((element) => {
                    gsap.fromTo(element,
                        {
                            opacity: 0, y: 50
                        },
                        {
                            opacity: 1,
                            duration: 1,
                            scrollTrigger: {
                                trigger: element,
                                start: "top bottom-=10%", 
                                toggleActions: "play none none none",
                                onEnter: () => ScrollTrigger.refresh(),
                            },
                        }
                    );
                });

                ScrollTrigger.refresh();
            }
        }, postsRef);

        return () => {
            context.revert();
        };
    }, [posts]);

    useEffect(() => {
        if (!hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        const currentElement = loadMoreRef.current;
        if (currentElement) observer.observe(currentElement);

        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, [hasNextPage, fetchNextPage]);

    if (isInitialLoading) {
        return <Loader />;
    }

    if (!isInitialLoading && posts.length === 0) {
        return <NoPostsAvailable />;
    }

    return (
        <section ref={postsRef} className="w-[90%] md:w-[85%] flex flex-col mx-auto mt-10 mb-16">
            <TypedText />
            <div className="container grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 gap-y-12 place-items-center">
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
                {hasNextPage && <div ref={loadMoreRef} className="h-10 w-full" />}
            </div>
            {loading && <Spinner />}
        </section>
    );
}

export default PostsList;
