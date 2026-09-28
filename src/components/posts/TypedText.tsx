import { useRef, useEffect } from "react";
import Typed from "typed.js";

import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const PROMPT = "ყოველთვის მინდოდა მეთქვა, რომ";

function TypedText() {
    const textRef = useRef(null);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (reduceMotion) return;

        const typed = new Typed(textRef.current, {
            strings: [PROMPT],
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
    }, [reduceMotion]);
    return (
        <div className="min-h-[2.25rem] px-1 text-ink">
            {/* reduced motion: the full prompt, statically, with the same cursor */}
            <span ref={textRef} className='text-[26px] md:text-3xl leading-9 tracking-wider font-dejavu'>{reduceMotion ? PROMPT : null}</span>
            {reduceMotion && <span className="typed-cursor" aria-hidden="true">|</span>}
        </div>
    );
}

export default TypedText;
