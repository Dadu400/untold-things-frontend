import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Dialog from "../posts/Dialog";
import SinglePost from "./SinglePost";
import "./SubmitDialog.css";

import { SubmitDialogProps } from "../../types/types";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

// matches the flyaway keyframes in SubmitDialog.css
const FLYAWAY_MS = 1300;

type Status = "idle" | "pending" | "sent" | "error";

const SubmitDialog: React.FC<SubmitDialogProps> = ({ isModalOpen, setIsModalOpen, messageTo, message, onSubmit }) => {
    const [status, setStatus] = useState<Status>("idle");
    const [isChecked, setIsChecked] = useState(false);
    const inFlightRef = useRef(false);
    const sentIdRef = useRef<string | null>(null);
    const reduceMotion = usePrefersReducedMotion();
    const navigate = useNavigate();

    const isBusy = status === "pending" || status === "sent";

    const handleClose = () => {
        if (isBusy) return;
        setStatus("idle");
        setIsModalOpen(false);
    };

    const handleButtonClick = async () => {
        if (inFlightRef.current || isBusy || !isChecked) return;
        inFlightRef.current = true;
        setStatus("pending");

        try {
            sentIdRef.current = await onSubmit();
            setStatus("sent");
        } catch (error) {
            console.error("Error submitting post:", error);
            setStatus("error");
        } finally {
            inFlightRef.current = false;
        }
    };

    // Only after the server confirms: let the plane fly, then open the new letter.
    useEffect(() => {
        if (status !== "sent") return;
        const timer = setTimeout(() => {
            setIsModalOpen(false);
            navigate(`/post/${sentIdRef.current}`);
        }, reduceMotion ? 0 : FLYAWAY_MS);
        return () => clearTimeout(timer);
    }, [status, reduceMotion, navigate, setIsModalOpen]);

    return (
        <Dialog open={isModalOpen} onClose={handleClose} className="max-w-[420px] px-3 sm:px-6">
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
                        showDelivered={false}
                    />
                </div>
                <div className="w-full max-w-[340px] flex flex-col justify-end">
                    <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                        <input
                            type="checkbox"
                            className="w-5 h-5 shrink-0 accent-[#D93835] cursor-pointer"
                            checked={isChecked}
                            disabled={isBusy}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="text-md font-dejavu tracking-wider">
                            გავეცანი და ვეთანხმები <a href="/terms" className="text-[#0078FE] underline-offset-4 hover:underline">წესებს</a>
                        </span>
                    </label>
                    <button
                        className={`button font-dejavu bg-brand text-white h-12 tracking-widest mt-4 flex justify-center items-center gap-1 ${status === "sent" ? "clicked" : ""} ${!isChecked ? "opacity-50 cursor-not-allowed" : isBusy ? "shadow-cta cursor-wait" : "shadow-cta hover:bg-brand-hover active:scale-[0.98]"} ${status === "pending" ? "opacity-80" : ""}`}
                        onClick={handleButtonClick}
                        disabled={!isChecked || isBusy}
                        aria-busy={status === "pending"}
                    >
                        {status === "pending" ? "იგზავნება…" : status === "sent" ? "გაიგზავნა" : "დადასტურება"}
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
                    {status === "error" && (
                        <p role="alert" className="mt-3 text-center text-sm font-dejavu tracking-wide text-muted">
                            წერილი ვერ გაიგზავნა. სცადე თავიდან.
                        </p>
                    )}
                </div>
            </div>
        </Dialog>
    );
};

export default SubmitDialog;
