import Game from "../../assets/icons/game.gif";
import { GamesProps } from "../../types/types";

function Games({ onClick }: GamesProps) {
    return (
        <div className="fixed z-50 bottom-0 right-0 p-6">
            <img 
                src={Game} 
                alt="Tic Tac Toe" 
                className="w-24 h-24 mb-4 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={onClick} 
            />
        </div>
    );
}

export default Games;
