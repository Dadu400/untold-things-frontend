import { useState } from "react";
import Dialog from "./Dialog";

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import LinkIcon from "@mui/icons-material/Link";
import CheckIcon from "@mui/icons-material/Check";

import { ShareDialogProps } from "../../types/types";

function ShareDialog({ isModalOpen, setIsModalOpen, onSharePost, shareUrl, shareMessage }: ShareDialogProps) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setIsCopied(true);
            onSharePost();
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[300px] md:max-w-[340px] dark:bg-bgDark">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold font-firago">გააზიარე წერილი</h2>
                <div className="flex space-x-4 py-3">
                    <div
                        className="flex items-center justify-center p-2 bg-[#a4bafc] text-white rounded-full hover:bg-gray-600 cursor-pointer"
                        onClick={handleCopyLink}
                    >
                        {isCopied ? <CheckIcon fontSize={"medium"} /> : <LinkIcon fontSize={"medium"} className="w-26 h-26" />}
                    </div>
                    <FacebookShareButton url={shareUrl} title={shareMessage}>
                        <div className="flex items-center justify-center p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
                                <path
                                    d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"
                                    fill="white"
                                ></path>
                            </svg>
                        </div>
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={shareMessage}>
                        <div className="flex items-center justify-center p-2 bg-black text-white rounded-full hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                <path
                                    d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"
                                    fill="white"
                                ></path>
                            </svg>
                        </div>
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl} title={shareMessage}>
                        <div className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
                                <path
                                    d="M25.873,6.069c-2.619-2.623-6.103-4.067-9.814-4.069C8.411,2,2.186,8.224,2.184,15.874c-.001,2.446,.638,4.833,1.852,6.936l-1.969,7.19,7.355-1.929c2.026,1.106,4.308,1.688,6.63,1.689h.006c7.647,0,13.872-6.224,13.874-13.874,.001-3.708-1.44-7.193-4.06-9.815h0Zm-9.814,21.347h-.005c-2.069,0-4.099-.557-5.87-1.607l-.421-.25-4.365,1.145,1.165-4.256-.274-.436c-1.154-1.836-1.764-3.958-1.763-6.137,.003-6.358,5.176-11.531,11.537-11.531,3.08,.001,5.975,1.202,8.153,3.382,2.177,2.179,3.376,5.077,3.374,8.158-.003,6.359-5.176,11.532-11.532,11.532h0Zm6.325-8.636c-.347-.174-2.051-1.012-2.369-1.128-.318-.116-.549-.174-.78,.174-.231,.347-.895,1.128-1.098,1.359-.202,.232-.405,.26-.751,.086-.347-.174-1.464-.54-2.788-1.72-1.03-.919-1.726-2.054-1.929-2.402-.202-.347-.021-.535,.152-.707,.156-.156,.347-.405,.52-.607,.174-.202,.231-.347,.347-.578,.116-.232,.058-.434-.029-.607-.087-.174-.78-1.88-1.069-2.574-.281-.676-.567-.584-.78-.595-.202-.01-.433-.012-.665-.012s-.607,.086-.925,.434c-.318,.347-1.213,1.186-1.213,2.892s1.242,3.355,1.416,3.587c.174,.232,2.445,3.733,5.922,5.235,.827,.357,1.473,.571,1.977,.73,.83,.264,1.586,.227,2.183,.138,.666-.1,2.051-.839,2.34-1.649,.289-.81,.289-1.504,.202-1.649s-.318-.232-.665-.405h0Z"
                                    fill="white"
                                ></path>
                            </svg>
                        </div>
                    </WhatsappShareButton>
                </div>
            </div>
        </Dialog>
    );
}

export default ShareDialog;