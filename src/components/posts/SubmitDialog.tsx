import React from "react";
import Dialog from "../posts/Dialog";
import SinglePost from "./SinglePost";

interface SubmitDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    recipient: string;
    message: string;
}

const SubmitDialog: React.FC<SubmitDialogProps> = ({isModalOpen, setIsModalOpen, recipient, message,}) => {
    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[460px]">
            <div className="p-4 flex flex-col items-center">
                <h2 className="text-xl font-firago tracking-wider my-2">გადახედე წერილს</h2>
                <div className="mb-4">
                    <SinglePost
                        recipient={recipient || "Unknown"}
                        message={message}
                        time={new Date().toLocaleString()}
                        likes={0}
                        shares={0}
                        liked={false}
                        onLike={() => {}}
                        onShare={() => {}}
                        onClick={() => {}}
                    />
                </div>
                <div className="flex flex-col justify-end">
                    <div className="flex">
                    <input type={"checkbox"} className="mr-2" />
                    <label className="text-md font-dejavu tracking-wider">
                        გავეცანი და ვეთანხმები <a href="/terms" className="text-blue-500">წესებს</a>
                    </label>
                    </div>
                    <button
                        className="font-dejavu px-6 py-2 bg-[#D93835] text-white rounded-xl tracking-widest mt-4"
                        onClick={() => setIsModalOpen(false)} >
                        დადასტურება
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default SubmitDialog;
