import { useState } from "react";
import Lottie from "lottie-react";
import flyingHeartAnimation from "../../assets/icons/flying-heart.json";

const FlyingHeart = () => {
    const [isFlying, setIsFlying] = useState(false);

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

    return (
        <button
            onClick={handleClick}
            className={`
                fixed bottom-4 right-2 z-50
                w-24 h-24
                cursor-pointer
                transition-transform duration-300
                hover:scale-110
                focus:outline-none
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

