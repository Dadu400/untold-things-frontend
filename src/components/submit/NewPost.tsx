import { useState, useRef, ChangeEvent } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SubmitDialog from "../posts/SubmitDialog";

function NewPost() {
    const [text, setText] = useState<string>("");
    const [recipient, setRecipient] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.fontFamily = "dejavu";
            textareaRef.current.style.height = "0px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <section className="mb-4 flex items-center">
            <div className="w-[340px] mx-auto h-[400px] flex flex-col rounded-2xl overflow-hidden shadow-lg bg-bgColor">
                <header className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-center gap-x-16">
                    <h2 className="text-xl font-firago">მიწერე წერილი</h2>
                </header>
                <div className="bg-bgColor">
                    <div className="flex items-baseline border-b border-gray-300">
                        <span className="text-[#3c3c43] pl-4 pr-2 font-firago">ვის:</span>
                        <input
                            placeholder="სახელი"
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="flex-1 py-2 px-2 bg-bgColor outline-none text-sm placeholder:font-dejavu placeholder:tracking-wider"
                        />
                    </div>
                </div>
                <div className="flex-1 bg-bgColor"></div>
                <footer
                    className="bg-bgColor p-2 my-4 flex justify-between items-center border-[1px] border-gray-300 rounded-xl mx-3"
                >
                    <textarea
                        ref={textareaRef}
                        placeholder="ყოველთვის მინდოდა მეთქვა, რომ..."
                        value={text}
                        onChange={handleInputChange}
                        className="w-full outline-none resize-none bg-bgColor overflow-hidden text-sm h-[20px] pl-2 placeholder:font-dejavu placeholder:tracking-wider"
                    />
                    <button
                        className={`p-[2px] rounded-full flex items-center self-end text-white ml-3 ${
                            text.trim() ? "bg-[#007aff]" : "bg-gray-300"
                        }`}
                        disabled={!text.trim()}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <ArrowUpwardIcon style={{ fontSize: "14px" }} />
                    </button>
                </footer>
            </div>
            <SubmitDialog
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                recipient={recipient}
                message={text}
            />
        </section>
    );
}

export default NewPost;
