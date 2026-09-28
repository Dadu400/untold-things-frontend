import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import SubmitDialog from "../posts/SubmitDialog";
import { releaseGlyphs } from "./releaseGlyphs";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { MAX_RECIPIENT_GRAPHEMES, normalizeRecipient, truncateGraphemes, validateRecipient } from "../../utils/recipient";

function NewPost() {
    const MAX_TEXT_LENGTH = 230;
    const [text, setText] = useState<string>("");
    const [to, setTo] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const sendButtonRef = useRef<HTMLButtonElement>(null);
    const cancelReleaseRef = useRef<(() => void) | null>(null);
    const reduceMotion = usePrefersReducedMotion();

    // What gets shown in the preview and stored; the input keeps exactly what was typed.
    const recipient = normalizeRecipient(to);
    const recipientProblem = validateRecipient(recipient);
    const hasUnsupportedCharacter = recipientProblem === "unsupported";

    useEffect(() => () => cancelReleaseRef.current?.(), []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTo(truncateGraphemes(e.target.value, MAX_RECIPIENT_GRAPHEMES));
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
        // ignore rapid repeat taps while the glyphs are still leaving
        if (!text.trim() || recipientProblem || isModalOpen || cancelReleaseRef.current) return;

        const textarea = textareaRef.current;
        const sendButton = sendButtonRef.current;
        if (reduceMotion || !textarea || !sendButton) {
            setIsModalOpen(true);
            return;
        }

        cancelReleaseRef.current = releaseGlyphs(textarea, sendButton, {
            onRelease: () => setIsModalOpen(true),
            onDone: () => {
                cancelReleaseRef.current = null;
            },
        });
    };

    const isButtonDisabled = !text.trim() || recipientProblem !== null;

    // Resolves with the new message id; throws on any failure so the dialog can react.
    const handlePostSubmit = async (): Promise<string> => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: recipient,
                message: text,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "");
            throw new Error(`Failed to submit post (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        if (!data?.messageId) {
            throw new Error("Response does not contain a valid message ID");
        }

        return String(data.messageId);
    };

    return (
        <section className="mb-4 flex items-center px-4">
            <form className="w-full max-w-[380px] mx-auto h-[420px] flex flex-col rounded-[28px] overflow-hidden border border-line/70 shadow-card bg-surface animate-fade-up" onSubmit={handleFormSubmit}>
                <div className="relative flex items-center pt-1.5 border-b border-line bg-surface">
                    <span className="text-muted pl-4 pr-1 font-firago">ვის:</span>
                    <input
                        placeholder="სახელი"
                        type="text"
                        value={to}
                        onChange={handleInputChange}
                        aria-invalid={hasUnsupportedCharacter}
                        aria-describedby="recipient-hint"
                        className="font-read flex-1 h-12 px-2 bg-transparent outline-none text-[16px] text-ink placeholder:font-dejavu placeholder:tracking-wider placeholder:text-muted/80"
                    />
                    <p id="recipient-hint" className="absolute left-4 right-4 top-full mt-2 text-[12px] leading-4 text-muted font-firago" aria-live="polite">
                        {hasUnsupportedCharacter ? "მხოლოდ ასოები, ციფრები, ტირე (-) და აპოსტროფი (')" : ""}
                    </p>
                </div>
                <div className="flex-1 bg-surface"></div>
                <div className={`flex justify-end px-5 -mb-2 text-[11px] tabular-nums transition-opacity duration-200 ${text.length > 0 ? "opacity-100" : "opacity-0"} ${text.length >= MAX_TEXT_LENGTH - 20 ? "text-brand" : "text-muted"}`} aria-live="polite">
                    {text.length}/{MAX_TEXT_LENGTH}
                </div>
                <footer className="pl-3 pr-1.5 py-1.5 my-4 flex justify-between items-end gap-2 border border-line rounded-[22px] mx-3 bg-surface transition-[border-color,box-shadow] duration-200 focus-within:border-[#007aff]/50 focus-within:ring-4 focus-within:ring-[#007aff]/10">
                    <textarea
                        ref={textareaRef}
                        placeholder="ყოველთვის მინდოდა მეთქვა, რომ..."
                        value={text}
                        onChange={handleTextareaChange}
                        maxLength={MAX_TEXT_LENGTH}
                        rows={1}
                        className="w-full self-center font-read text-[16px] leading-6 text-ink outline-none resize-none bg-transparent overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden h-6 max-h-40 py-0.5 placeholder:font-dejavu placeholder:tracking-wider placeholder:text-muted/80"
                    />
                    <button
                        ref={sendButtonRef}
                        type="submit"
                        aria-label="Send"
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white transition-[background-color,transform] duration-200 ${isButtonDisabled ? "bg-gray-300 dark:bg-gray-600" : "bg-[#007aff] hover:brightness-110 active:scale-90"}`}
                        disabled={isButtonDisabled}
                    >
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                    </button>
                </footer>
            </form>
            <SubmitDialog
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                messageTo={recipient}
                message={text}
                onSubmit={handlePostSubmit}
            />
        </section>
    );
}

export default NewPost;
