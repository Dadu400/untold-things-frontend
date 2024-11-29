import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function SinglePost() {
    return (
        <div className="w-[300px] mx-auto h-[400px] bg-gray-100 flex flex-col rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-[#f6f6f7] border-b border-b-gray p-4 flex items-baseline justify-between">
                <ChevronLeftIcon className="w-6 h-6 text-blue-500" />
                <div className="flex flex-col items-center ml-2">
                    <AccountCircleIcon fontSize="large" style={{ color: '#999999' }} />
                    <span className="text-sm">John Doe</span>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <FavoriteBorderIcon style={{ color: '#0078FE' }} />
                        <span className="text-xs text-gray-500">14</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <ShareIcon style={{ color: '#0078FE' }} />
                        <span className="text-xs text-gray-500">14</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mb-32">
                <div className="flex flex-col items-center mt-2">
                    <span className="text-xs text-gray-500 font-medium">Text Message</span>
                    <span className="text-xs text-gray-500">Today 12:01PM</span>
                </div>
                <div className="py-4 flex flex-col self-end max-w-[240px]">
                    <div className="flex items-end gap-x-1">
                        <p className="bg-[#248bf5] text-white rounded-xl p-2 max-w-[200px]">
                            ნეტავ
                        </p>
                        <ErrorOutlineIcon className="w-2 h-2 mr-1 text-red-500" />
                    </div>
                    <p className="mr-2 my-1 flex items-center text-red-500 self-end text-xs font-semibold">Not Delivered</p>
                </div>
            </div>
        </div>
    );
}

export default SinglePost;
