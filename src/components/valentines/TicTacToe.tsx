import { useState } from "react";
import Dialog from "../posts/Dialog";
import Games from "./Games";

const emptyBoard = Array(9).fill(null);

const TicTacToe = () => {
    const [board, setBoard] = useState(emptyBoard);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [open, setOpen] = useState(false);

    const checkWinner = (newBoard: (string | null)[]) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return newBoard[a];
            }
        }

        return newBoard.includes(null) ? null : "draw";
    };

    const computerMove = (newBoard: (string | null)[]) => {
        setIsWaiting(true);
        setTimeout(() => {
            const availableMoves = newBoard
                .map((cell, index) => cell === null ? index : null)
                .filter(i => i !== null) as number[];

            if (availableMoves.length === 0) return;

            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            newBoard[randomMove] = "❌";

            const newWinner = checkWinner(newBoard);
            setWinner(newWinner);
            setIsUserTurn(true);
            setIsWaiting(false);
            setBoard([...newBoard]);
        }, 300);
    };

    const handleClick = (index: number) => {
        if (board[index] || winner || isWaiting) return;
        const newBoard = [...board];
        newBoard[index] = "❤️";
        setBoard(newBoard);
        setIsUserTurn(false);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            setWinner(newWinner);
        } else {
            computerMove(newBoard);
        }
    };

    const restartGame = () => {
        setBoard(emptyBoard);
        setWinner(null);
        setIsUserTurn(true);
        setIsWaiting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Games onClick={() => setOpen(true)} />
            <Dialog open={open} onClose={() => setOpen(false)} className="w-96 bg-white dark:bg-bgDark p-6">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold font-oswald">Tic-Tac-Toe</h2>
                    <div className="grid grid-cols-3 gap-2 bg-white dark:bg-bgDark p-4 rounded-lg shadow-lg">
                        {board.map((cell, index) => (
                            <button
                                key={index}
                                className={`w-20 h-20  lg:w-24 lg:h-24 text-4xl font-bold flex items-center justify-center 
                                            bg-[#FFC8DC] hover:bg-[#FFB6C1] rounded-lg transition-all duration-200 
                                            ${isWaiting ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => handleClick(index)}
                                disabled={cell !== null || winner !== null || isWaiting}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>

                    <div className="mt-2 h-10 text-xl font-semibold font-oswald flex items-center justify-center">
                        {winner === "draw" ? "It's a Draw! 😅" : winner ? `${winner} Wins! 🎉` : ""}
                    </div>

                    <button
                        onClick={restartGame}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all font-oswald"
                    >
                        Restart Game
                    </button>
                </div>
            </Dialog>
        </div>
    );
};

export default TicTacToe;
