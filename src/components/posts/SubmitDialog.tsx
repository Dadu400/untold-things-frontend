import React, { useState } from "react";
import Dialog from "../posts/Dialog";
import SinglePost from "./SinglePost";
import "./SubmitDialog.css";

interface SubmitDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    messageTo: string;
    message: string;
    onSubmit?: () => void;
}

const SubmitDialog: React.FC<SubmitDialogProps> = ({ isModalOpen, setIsModalOpen, messageTo, message, onSubmit }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleButtonClick = async () => {
        if (!isClicked && isChecked) {
            setIsClicked(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsClicked(false);
            setIsModalOpen(false);
            onSubmit?.();
        }
    };

    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[460px]">
            <div className="p-4 flex flex-col items-center">
                <h2 className="text-2xl font-firago tracking-wider mb-2">გადახედე წერილს</h2>
                <div className="mb-4">
                    <SinglePost
                        id={0}
                        messageTo={messageTo}
                        message={message}
                        time={new Date().toLocaleString()}
                        likes={0}
                        shares={0}
                        liked={false}
                        onLike={() => {}}
                        onShare={() => {}}
                        onClick={() => {}}
                        disabled={true}
                    />
                </div>
                <div className="flex flex-col justify-end">
                    <div className="flex">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <label className="text-md font-dejavu tracking-wider">
                            გავეცანი და ვეთანხმები <a href="/terms" className="text-blue-500">წესებს</a>
                        </label>
                    </div>
                    <button
                        className={`button font-dejavu bg-[#D93835] text-white py-2 rounded-xl tracking-widest mt-4 flex justify-center items-center gap-1 ${isClicked ? "clicked" : ""} ${!isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={handleButtonClick}
                        disabled={!isChecked}
                    >
                        {isClicked ? "მიმდინარეობს გადამოწმება!" : "დადასტურება"}
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="20px"
                            viewBox="0 0 512 512"
                            fill="white"
                            className="w-6 h-6"
                        >
                            <path
                                id="paper-plane-icon"
                                fill="white"
                                d="M462,54.955L355.371,437.187l-135.92-128.842L353.388,167l-179.53,124.074L50,260.973L462,54.955z M202.992,332.528v124.517l58.738-67.927L202.992,332.528z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default SubmitDialog;
