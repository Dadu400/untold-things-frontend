import { useEffect, useMemo, useState } from "react";

import ShareIcon from "@mui/icons-material/Share";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import Dialog from "../posts/Dialog";
import { renderShareCard } from "./renderShareCard";

const FILE_NAME = "racvergitxari.png";
const SHARE_TEXT = "#რაცვერგითხარი @racvergitxari.ge";

type ShareCardDialogProps = {
    open: boolean;
    onClose: () => void;
    message: string;
    messageTo: string;
};

function canShareFile(file: File) {
    try {
        return typeof navigator.share === "function"
            && typeof navigator.canShare === "function"
            && navigator.canShare({ files: [file] });
    } catch (_) {
        return false;
    }
}

function ShareCardDialog({ open, onClose, message, messageTo }: ShareCardDialogProps) {
    const [blob, setBlob] = useState<Blob | null>(null);
    const [failed, setFailed] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        setBlob(null);
        setFailed(false);
        renderShareCard({ message, messageTo, dark: document.documentElement.classList.contains("dark") })
            .then((result) => { if (!cancelled) setBlob(result); })
            .catch((error) => {
                console.error("Error generating share image:", error);
                if (!cancelled) setFailed(true);
            });
        return () => { cancelled = true; };
    }, [open, message, messageTo, attempt]);

    const url = useMemo(() => (blob ? URL.createObjectURL(blob) : null), [blob]);
    useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);

    const file = useMemo(() => (blob ? new File([blob], FILE_NAME, { type: "image/png" }) : null), [blob]);
    const shareSupported = file ? canShareFile(file) : false;

    const handleSave = () => {
        if (!url) return;
        const link = document.createElement("a");
        link.href = url;
        link.download = FILE_NAME;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    const handleShare = async () => {
        if (!file) return;
        // Image-only share: attaching text hides image-only targets like TikTok/Instagram
        // from the iOS share sheet. The caption goes to the clipboard instead (not awaited,
        // so the user gesture is still valid for navigator.share).
        navigator.clipboard?.writeText(SHARE_TEXT).catch(() => {});
        try {
            await navigator.share({ files: [file] });
        } catch (error) {
            // user closed the share sheet
            if (error instanceof DOMException && error.name === "AbortError") return;
            console.error("Error sharing image:", error);
            handleSave();
        }
    };

    const primaryClass = "w-full inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full bg-brand text-white font-dejavu tracking-widest whitespace-nowrap shadow-cta transition-[background-color,transform] duration-200 hover:bg-brand-hover active:scale-[0.97] disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none";
    const linkClass = "mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline disabled:opacity-50 disabled:pointer-events-none";

    return (
        <Dialog open={open} onClose={onClose} className="max-w-[400px] px-4 sm:px-6">
            <div className="w-full flex flex-col items-center">
                <div className="relative h-[min(52svh,460px)] aspect-[9/16] rounded-2xl overflow-hidden border border-line/70 bg-surface-muted shadow-card">
                    {url ? (
                        <img
                            src={url}
                            alt={message}
                            className="w-full h-full object-contain animate-overlay-in"
                        />
                    ) : failed ? (
                        <button
                            onClick={() => setAttempt((a) => a + 1)}
                            aria-label="Retry"
                            className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center rounded-full text-muted hover:bg-black/5 dark:hover:bg-white/10"
                        >
                            <RefreshRoundedIcon />
                        </button>
                    ) : (
                        <div className="absolute inset-0 animate-pulse bg-line/40" aria-busy="true" />
                    )}
                </div>

                {/* Where the share sheet exists it is the main path: its "Save Image" goes to Photos
                    (ready for Stories), while a download lands in Files on iOS. */}
                <div className="w-full mt-6 flex flex-col items-center">
                    {shareSupported ? (
                        <>
                            <button onClick={handleShare} disabled={!file} className={primaryClass}>
                                <ShareIcon style={{ fontSize: 20 }} />
                                გაზიარება
                            </button>
                            <button onClick={handleSave} disabled={!url} className={linkClass}>
                                <FileDownloadOutlinedIcon style={{ fontSize: 18 }} />
                                ან ჩამოტვირთე სურათი
                            </button>
                        </>
                    ) : (
                        <button onClick={handleSave} disabled={!url} className={primaryClass}>
                            <FileDownloadOutlinedIcon style={{ fontSize: 20 }} />
                            სურათის შენახვა
                        </button>
                    )}
                </div>
            </div>
        </Dialog>
    );
}

export default ShareCardDialog;
