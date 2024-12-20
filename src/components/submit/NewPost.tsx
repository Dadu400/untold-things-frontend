import { useState, useRef, ChangeEvent } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function NewPost() {
    const [text, setText] = useState<string>("");
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
            <div className="w-[340px] mx-auto h-[400px] flex flex-col rounded-2xl overflow-hidden shadow-lg z-10 bg-bgColor">
                <header className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-center gap-x-16">
                    <h2 className="text-lg font-firago">მიწერე</h2>
                </header>
                <div className="bg-bgColor">
                        <div className="flex items-baseline border-b border-gray-300">
                            <span className="text-[#3c3c43] pl-4 pr-2 font-firago">ვის:</span>
                            <input
                                placeholder='სახელი'
                                type="text"
                                className="flex-1 py-2 px-2 outline-none text-sm placeholder:font-dejavu placeholder:tracking-wider"/>
                        </div>
                </div>
                <div className="flex-1 bg-bgColor z-10"></div>
                <footer
                    className="bg-bgColor p-2 my-4 flex justify-between items-center border-[1px] border-gray-300 rounded-xl mx-3 z-10">
                   <textarea
                       ref={textareaRef}
                       placeholder="ყოველთვის მინდოდა მეთქვა, რომ..."
                       value={text}
                       onChange={handleInputChange}
                       className="w-full outline-none resize-none overflow-hidden text-sm h-[20px] pl-2 placeholder:font-dejavu placeholder:tracking-wider"
                   />
                    <button
                        className={`p-[2px] rounded-full flex items-center self-end text-white ml-3 ${
                            text.trim()
                                ? "bg-[#007aff]"
                                : "bg-gray-300"
                        }`}
                        disabled={!text.trim()}
                    >
                        <ArrowUpwardIcon style={{fontSize: "14px"}}/>
                    </button>
                </footer>
            </div>
        </section>
    );
}

export default NewPost;
