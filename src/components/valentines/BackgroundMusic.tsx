import { useEffect, useRef } from "react";
import Vynil from "../../assets/icons/vynil.gif";

interface BackgroundMusicProps {
  audio: string;
  playAudio: boolean;
  setPlayAudio: (value: boolean) => void;
  startTime?: number;
}

function BackgroundMusic({ audio, playAudio, setPlayAudio, startTime = 0 }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audio);
        audioRef.current.currentTime = startTime;
      audioRef.current.volume = 0.15;
      audioRef.current.loop = true;
    }

    if (playAudio) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio playback error:", err));
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [playAudio, audio, startTime]);

  const onButtonClick = () => {
    if (!audioRef.current) return;

    if (!playAudio) {
      setPlayAudio(true);
    } else {
      const fadeAudio = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.1) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeAudio);
          audioRef.current?.pause();
          if (audioRef.current) audioRef.current.volume = 0.15;
          setPlayAudio(false);
        }
      }, 100);
    }
  };

  return (
    <div className="fixed z-9 top-20 right-0 p-6">
      <div onClick={onButtonClick} className="flex items-center gap-2 cursor-pointer p-2 rounded-full">
        <img src={Vynil} alt="Vynil" className="w-10 h-10 lg:w-24 lg:h-24" />
        <div className="flex flex-col">
          <p className="text-sm lg:text-lg font-mono">KESHI</p>
          <span className="text-sm lg:text-lg font-mono">Understand</span>
        </div>
      </div>
    </div>
  );
}

export default BackgroundMusic;
