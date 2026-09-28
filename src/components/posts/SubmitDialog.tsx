import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "../posts/Dialog";
import SinglePost from "./SinglePost";
import "./SubmitDialog.css";

import { SubmitDialogProps } from "../../types/types";

const SubmitDialog: React.FC<SubmitDialogProps> = ({ isModalOpen, setIsModalOpen, messageTo, message, onSubmit }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        if (!isClicked && isChecked) {
            setIsClicked(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setIsClicked(false);
            setIsModalOpen(false);
            onSubmit?.();
            navigate("/");
        }
    };

    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[420px] px-3 sm:px-6">
            <div className="w-full pt-9 flex flex-col items-center">
                <div className="w-full mb-5">
                    <SinglePost
                        id={0}
                        messageTo={messageTo}
                        message={message}
                        timestamp={Date.now()}
                        likes={0}
                        shares={0}
                        liked={false}
                        messageStatus={"pending"}
                        disabled={true}
                    />
                </div>
                <div className="w-full max-w-[340px] flex flex-col justify-end">
                    <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                        <input
                            type="checkbox"
                            className="w-5 h-5 shrink-0 accent-[#D93835] cursor-pointer"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="text-md font-dejavu tracking-wider">
                            გავეცანი და ვეთანხმები <a href="/terms" className="text-[#0078FE] underline-offset-4 hover:underline">წესებს</a>
                        </span>
                    </label>
                    <button
                        className={`button font-dejavu bg-brand text-white h-12 tracking-widest mt-4 flex justify-center items-center gap-1 ${isClicked ? "clicked" : ""} ${!isChecked ? "opacity-50 cursor-not-allowed" : "shadow-cta hover:bg-brand-hover active:scale-[0.98]"}`}
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
