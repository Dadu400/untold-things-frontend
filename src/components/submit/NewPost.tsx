import { useState, useRef, ChangeEvent, FormEvent } from "react";

import {useNavigate} from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import SubmitDialog from "../posts/SubmitDialog";

function NewPost() {
    const MAX_TEXT_LENGTH = 230;
    const MAX_INPUT_LENGTH = 10;
    const [text, setText] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value.slice(0, MAX_INPUT_LENGTH));
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value.slice(0, MAX_TEXT_LENGTH));

        if (textareaRef.current) {
            textareaRef.current.style.height = "0px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim() && to.trim()) {
            setIsModalOpen(true);
        }
    };

    const isButtonDisabled = !text.trim() || !to.trim();

    const handlePostSubmit = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    to,
                    message: text,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API error response:", errorText);
                new Error("Failed to submit post");
            }

            const data = await response.json();

            if (data && data.messageId ) {
                navigate(`/post/${data.messageId}`);
            } else {
                console.error("Invalid response structure or missing messageId:", data);
                new Error("Response does not contain a valid message ID");
            }

            setTo("");
            setText("");
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };


    return (
        <section className="mb-4 flex items-center">
            <form className="w-[340px] mx-auto h-[400px] flex flex-col rounded-2xl overflow-hidden shadow-lg bg-bgColor" onSubmit={handleFormSubmit}>
                <header className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-center gap-x-16">
                    <h2 className="text-xl font-firago">მიწერე წერილი</h2>
                </header>
                <div className="bg-bgColor">
                    <div className="flex items-baseline border-b border-gray-300">
                        <span className="text-[#3c3c43] pl-4 pr-2 font-firago">ვის:</span>
                        <input
                            placeholder="სახელი"
                            type="text"
                            value={to}
                            onChange={handleInputChange}
                            maxLength={MAX_INPUT_LENGTH}
                            className="font-roboto flex-1 py-2 px-2 bg-bgColor outline-none text-sm placeholder:font-dejavu placeholder:tracking-wider"
                        />
                    </div>
                </div>
                <div className="flex-1 bg-bgColor"></div>
                <footer className="bg-bgColor p-2 my-4 flex justify-between items-center border-[1px] border-gray-300 rounded-xl mx-3">
                    <textarea
                        ref={textareaRef}
                        placeholder="ყოველთვის მინდოდა მეთქვა, რომ..."
                        value={text}
                        onChange={handleTextareaChange}
                        maxLength={MAX_TEXT_LENGTH}
                        className="w-full font-roboto outline-none resize-none bg-bgColor overflow-hidden text-sm h-[20px] pl-2 placeholder:font-dejavu placeholder:tracking-wider"
                    />
                    <button
                        type="submit"
                        className={`p-[2px] rounded-full flex items-center self-end text-white mt-2 ${isButtonDisabled ? "bg-gray-300" : "bg-[#007aff]"}`}
                        disabled={isButtonDisabled}
                    >
                        <ArrowUpwardIcon style={{ fontSize: "14px" }} />
                    </button>
                </footer>
            </form>
            <SubmitDialog
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                messageTo={to}
                message={text}
                onSubmit={handlePostSubmit}
            />
        </section>
    );
}

export default NewPost;
