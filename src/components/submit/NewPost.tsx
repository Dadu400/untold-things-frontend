import { useState, useRef, ChangeEvent } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ParticlesBackground from "../../ParticlesBackground";

function NewPost() {
    const [text, setText] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "20px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <section>
            <div className="w-[360px] mx-auto h-[400px] flex flex-col rounded-2xl overflow-hidden shadow-lg py-2">
                <header className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-center gap-x-16">
                    <h2 className="text-lg font-firago">დაწერე პოსტი</h2>
                    {/*<button className="text-blue-500 font-semibold">preview</button>*/}
                </header>
                <div className="bg-[#ffffff]">
                        <div className="flex items-center border-b border-gray-300">
                            <span className="text-[#3c3c43] pl-4 pr-2 font-firago">ვის:</span>
                            <input
                                type="text"
                                className="flex-1 py-2 px-2 outline-none"/>
                        </div>
                </div>
                <div className="flex-1 bg-white"></div>
                <footer
                    className="bg-white p-2 flex justify-between items-center border-[1px] border-gray-300 rounded-xl mx-3 my-2">
                   <textarea
                       ref={textareaRef}
                       value={text}
                       onChange={handleInputChange}
                       className="w-full outline-none resize-none overflow-hidden text-xs p-1 h-[20px] leading-tight"
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
