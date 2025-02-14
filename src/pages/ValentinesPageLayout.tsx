import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ValentinesParticles from "../components/particles/ValentinesDayParticlesBackground";
import BackgroundMusic from "../components/valentines/BackgroundMusic";
import TicTacToe from "../components/valentines/TicTacToe";

import LoveMessage from "../assets/icons/love_message.gif";

interface ValentinesPageLayoutProps {
    children: React.ReactNode;
}

function ValentinesPageLayout({ children }: ValentinesPageLayoutProps) {
    const [playAudio, setPlayAudio] = useState(true);
    const navigation = useNavigate();

    const handleImageClick = () => {
        navigation("/valentinesday/letter");
    };

    return (
        <main className="relative min-h-screen flex flex-col">
            <div className="absolute inset-0 animate-anime"></div>
            <div className="absolute inset-0 z-0">
                <ValentinesParticles />
            </div>
            <header className="z-10 flex items-center justify-between p-4">
                <BackgroundMusic
                    audio="/audio/keshi-understand.mp3"
                    playAudio={playAudio}
                    setPlayAudio={setPlayAudio}
                />
                <img
                    src={LoveMessage}
                    alt="Love message"
                    className="w-16 cursor-pointer lg:w-24"
                    onClick={handleImageClick}
                />
            </header>
            <div className="relative z-10 flex flex-col items-center">
            {children}
                <TicTacToe />
            </div>
        </main>
    );
}

export default ValentinesPageLayout;
