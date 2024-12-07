import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

function SinglePost({ className }: { className?: string }) {
    return (
        <div className={`w-[300px] mx-auto h-[400px] bg-gray-100 flex flex-col rounded-2xl overflow-hidden shadow-lg ${className}`}>
            <div className="bg-[#f6f6f7] border-b border-b-gray-300 p-4 flex items-baseline justify-end gap-x-12">
                <div className="flex flex-col items-center">
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
            <div className="flex flex-col items-center mb-32 p-2">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 font-medium">Message</span>
                    <span className="text-xs text-gray-500">Today 12:01PM</span>
                </div>
                <div className="flex flex-col self-end max-w-[240px] mt-3">
                            <span className="word-break bg-[#248bf5] p-2 text-sm leading-normal rounded-xl text-white text-wrap">
                               ზამთრის სეზონის დადგომასთან ერთად ავტომობილებს განსაკუთრებული მომზადება სჭირდებათ. მათ შორის საბურავების შეცვლა და ანტიფრიზის განახლება. იმისთვის, რომ ზამთრის სეზონისთვის მოამზადო შენი
                            </span>
                    <p className="mr-2 my-1 flex items-center text-gray-500 self-end text-xs font-semibold">Delivered</p>
                </div>
            </div>
        </div>
    );
}

export default SinglePost;