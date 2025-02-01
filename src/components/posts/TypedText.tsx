import { useRef, useEffect } from "react";
import Typed from "typed.js";

function TypedText() {
    const textRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(textRef.current, {
            strings: ["ყოველთვის მინდოდა მეთქვა, რომ"],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 1000,
            loop: true,
            smartBackspace: false,
            cursorChar: "|",
        });

        return () => {
            typed.destroy();
        };
    }, []);
    return (
        <div>
            <span ref={textRef} className='text-xl md:text-3xl tracking-wider font-dejavu font-regular'></span>
        </div>
    );
}

export default TypedText;