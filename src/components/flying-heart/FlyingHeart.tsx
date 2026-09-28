import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import flyingHeartAnimation from "../../assets/icons/flying-heart.json";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const FlyingHeart = () => {
    const [isFlying, setIsFlying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const reduceMotion = usePrefersReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        if (isFlying) return;

        setIsFlying(true);

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth"
        });

        setTimeout(() => {
            setIsFlying(false);
        }, 1500);
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={handleClick}
            className={`
                fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-1 sm:right-2 z-50
                w-[72px] h-[72px] sm:w-24 sm:h-24
                cursor-pointer
                transition-all duration-300
                hover:scale-110
                animate-fade-in
                no-tap-highlight
                ${isFlying ? 'animate-fly-up pointer-events-none' : ''}
            `}
            aria-label="Scroll to top"
        >
            <Lottie
                animationData={flyingHeartAnimation}
                // reduced motion: hold the first frame instead of looping
                loop={!reduceMotion}
                autoplay={!reduceMotion}
                className="w-full h-full drop-shadow-lg no-tap-highlight"
            />
        </button>
    );
};

export default FlyingHeart;

