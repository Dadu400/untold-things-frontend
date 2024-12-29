import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SinglePost from "./SinglePost";
import TypedText from "./TypedText";
import { useNavigate } from "react-router-dom";
import useFetch from "../../UseFetch";

gsap.registerPlugin(ScrollTrigger);

const PostsList = () => {
    const { posts, loading } = useFetch({url: `${process.env.REACT_APP_API_URL}/v1/messages`, });
    const postsRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
    }, [posts]);

    const handleLike = (id: number, liked: boolean) => {
    };

    const handleShare = (id: number) => {

    };

    const navigateToPost = (id: number) => {
        console.log(id);
        navigate(`/post/${id}`);
    };

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (!posts.length) {
        return <div>No posts available.</div>;
    }

    return (
        <section ref={postsRef} className="w-[90%] md:w-[85%] flex flex-col mx-auto my-10">
            <TypedText />
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mt-10 place-items-center">
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
                        liked={false}
                        onLike={() => handleLike(post.id , true)}
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
