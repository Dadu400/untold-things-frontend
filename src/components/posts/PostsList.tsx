import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SinglePost from "./SinglePost";
import TypedText from "./TypedText";

gsap.registerPlugin(ScrollTrigger);

function PostsList() {
    const postsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const posts = document.querySelectorAll(".single-post");

            if (posts.length === 0) {
                console.error("No elements found with the class .single-post");
                return;
            }

            gsap.set(posts, { opacity: 0, y: 50 });

            posts.forEach((post, index) => {
                if (index % 8 === 0) {
                    const batch = Array.from(posts).slice(index, index + 8);

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: batch[0],
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }).to(batch, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 1,
                    });
                }
            });
        }, postsRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={postsRef} className="w-[90%] md:w-[85%] flex flex-col mx-auto my-20">
            <TypedText />
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-12 mt-10 place-items-center">
                {Array.from({ length: 30 }).map((_, index) => (
                    <SinglePost key={index} className="single-post" />
                ))}
            </div>
        </section>
    );
}

export default PostsList;
