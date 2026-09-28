import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import { DialogProps } from '../../types/types';


function Dialog ({ open, onClose, children, className } : DialogProps )  {
    useEffect(() => {
        if (!open || !onClose) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    // portal: transformed ancestors (animated cards) would otherwise trap the fixed overlay
    return createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-overlay-in"
            onClick={onClose} >
            <div className={`bg-surface text-ink border border-line/60 rounded-3xl shadow-2xl p-6 flex items-baseline justify-center relative w-full max-h-[calc(100svh-2rem)] overflow-y-auto animate-dialog-in ${className ?? ''}`}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}>
                {children}
                <button
                    className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full text-muted transition-colors duration-200 hover:bg-black/5 hover:text-ink dark:hover:bg-white/10"
                    aria-label="Close"
                    onClick={onClose} >
                    <CloseIcon />
                </button>
            </div>
        </div>,
        document.body
    );
}

export default Dialog;
