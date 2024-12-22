import Dialog from "./Dialog";

import ShareIcon from '@mui/icons-material/Share';

interface ShareDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onSharePost: () => void;
}

function ShareDialog({ isModalOpen, setIsModalOpen, onSharePost }: ShareDialogProps) {
    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[300px] md:max-w-[340px]">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold font-firago">გააზიარე წერილი</h2>
                <div className="flex space-x-4 py-3">
                    <button
                        className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                        onClick={onSharePost}
                    >
                        <ShareIcon />
                    </button>
                    <button className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800"
                        onClick={() => alert("Sharing on Facebook!")}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            fontSize="22"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M279.14 288l14.22-92.66h-88.91V134.2c0-25.35 12.42-50.06 52.24-50.06H293V6.26S273.43 0 248.69 0c-73.46 0-121.51 44.38-121.51 124.72v70.62H56.89V288h70.29v224h92.72V288z" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-center p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
                        onClick={() => alert("Sharing on Messenger!")}>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            fontSize="22"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M256 0C114.62 0 0 114.61 0 256c0 87.5 40.63 165.79 104.53 215.36V512l96.13-52.34a252.6 252.6 0 0 0 55.35 6.35c141.38 0 256-114.61 256-256S397.38 0 256 0Zm130.18 182.13-59.14 87.22a24 24 0 0 1-33.13 6.69l-54.41-36.27a12 12 0 0 0-13.38.02l-76.29 50.85c-8.22 5.48-18.76-4.46-13.22-13.08l59.14-87.23a24 24 0 0 1 33.13-6.69l54.41 36.27a12 12 0 0 0 13.38-.02l76.29-50.85c8.22-5.48 18.76 4.46 13.22 13.08Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export default ShareDialog;
