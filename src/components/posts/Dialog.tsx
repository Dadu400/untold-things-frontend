import CloseIcon from '@mui/icons-material/Close';
import {ReactNode} from "react";

interface ShareDialogProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

function Dialog ({ open, onClose, children, className } : ShareDialogProps )  {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            onClick={onClose} >
            <div className={` ${className} bg-gray-100 rounded-lg shadow-lg p-6 w-full flex items-baseline justify-center relative mx-4`}
                onClick={(e) => e.stopPropagation()}>
                {children}
                <button
                    className="absolute top-2 right-2"
                    onClick={onClose} >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
}

export default Dialog;
