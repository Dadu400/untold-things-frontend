import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import searchIcon from "../../assets/icons/loupe.png";

function SearchBar() {
    const inputRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(inputRef.current, {
            strings: ["მოძებნე სახელის მიხედვით ..."],
            backDelay: 500,
            typeSpeed: 60,
            backSpeed: 30,
            attr: "placeholder",
            loop: true,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="w-full my-10">
            <form>
                <div className="flex items-center mx-auto h-10 w-[80%] lg:w-[70%]">
                    <div className="relative w-full">
                        <input
                            ref={inputRef}
                            className="w-full border-gray border-[1px] outline-none text-sm md:text-lg rounded-xl h-10 py-6 px-4 font-bpg"
                        />
                        <img
                            src={searchIcon}
                            alt="search"
                            className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer w-6"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}

export default SearchBar;
