import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SinglePost from "./SinglePost";
import MasonryGrid from "./MasonryGrid";
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

    useEffect(() => {
        const restore = () => {
            try {
                const stored = sessionStorage.getItem('postsListScrollY');
                if (!stored) return;
                const y = parseInt(stored, 10);
                if (Number.isNaN(y)) return;

                window.scrollTo(0, y);

                const rafId = requestAnimationFrame(() => window.scrollTo(0, y));
                const timeoutId = window.setTimeout(() => window.scrollTo(0, y), 50);

                sessionStorage.removeItem('postsListScrollY');

                return () => {
                    cancelAnimationFrame(rafId);
                    clearTimeout(timeoutId);
                };
            } catch (_) {
            }
        };

        const cleanup = restore();
        return () => {
            if (typeof cleanup === 'function') cleanup();
        };
    }, [posts.length, isInitialLoading]);

    if (isInitialLoading) {
        return <Loader />;
    }

    if (!isInitialLoading && posts.length === 0) {
        return <NoPostsAvailable />;
    }

    return (
        <section ref={postsRef} className="w-full max-w-[1200px] flex flex-col mx-auto px-4 sm:px-6 mt-8 md:mt-10 mb-16">
            <TypedText />
            <MasonryGrid className="mt-6 md:mt-8">
                {posts.map((post) => (
                    <SinglePost
                        key={post.id}
                        className="single-post animate-fade-up"
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
            </MasonryGrid>
            {hasNextPage && <div ref={loadMoreRef} className="h-10 w-full" />}
            {loading && <Spinner />}
        </section>
    );
}

export default PostsList;
