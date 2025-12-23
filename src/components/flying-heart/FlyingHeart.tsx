import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import flyingHeartAnimation from "../../assets/icons/flying-heart.json";

const FlyingHeart = () => {
    const [isFlying, setIsFlying] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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
            behavior: "smooth"
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
                fixed bottom-4 right-2 z-50
                w-24 h-24
                cursor-pointer
                transition-all duration-300
                hover:scale-110
                focus:outline-none
                animate-fade-in
                ${isFlying ? 'animate-fly-up pointer-events-none' : ''}
            `}
            aria-label="Scroll to top"
        >
            <Lottie
                animationData={flyingHeartAnimation}
                loop={true}
                autoplay={true}
                className="w-full h-full drop-shadow-lg"
            />
        </button>
    );
};

export default FlyingHeart;

