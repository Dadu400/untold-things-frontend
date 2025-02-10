import BackgroundMusic from "../components/valentines/BackgroundMusic";
import { useState } from "react";
import TicTacToe from "../components/valentines/TicTacToe";
import ValentinesQuestion from "../components/valentines/ValentinesStory";

function ValentinesDay() {
    const [playAudio, setPlayAudio] = useState(false);
    return (
        <div className="">
            <BackgroundMusic audio="/audio/keshi-understand.mp3" playAudio={playAudio} setPlayAudio={setPlayAudio} startTime={19}/>
            <div className="flex flex-col items-center">
                <ValentinesQuestion />
            <TicTacToe />
        </div>
        </div>
    );
}

export default ValentinesDay;
