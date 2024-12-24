import React from "react";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-rose-100">
            {/* Wings */}
            <div className="absolute w-[120px] h-[50px] bg-white rounded-[12px_20px_60px_20px] border-b-[3px] border-gray-200 -ml-[60px] left-1/2 animate-flap-right"></div>
            <div className="absolute w-[120px] h-[50px] bg-white rounded-[12px_20px_20px_60px] border-b-[3px] border-gray-200 -ml-[60px] left-1/2 animate-flap-left"></div>

            {/* Heart */}
            <div className="relative z-10 w-[120px] h-[100px] -ml-[50px] left-1/2 animate-pulse-heart">
                <div className="absolute w-[50px] h-[80px] bg-red-600 rounded-t-full rotate-[-45deg] origin-bottom"></div>
                <div className="absolute w-[50px] h-[80px] bg-red-600 rounded-t-full rotate-[45deg] origin-bottom left-1/2"></div>
            </div>

            {/* Envelope */}
            <div
                id="envelope"
                className="relative w-[320px] h-[200px] mt-20 bg-white rounded-md shadow-lg animate-bounce"
            >
                <div className="absolute w-0 h-0 border-t-[108px] border-t-white border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent top-0"></div>
                <div className="absolute w-0 h-0 border-b-[90px] border-b-white border-l-[170px] border-l-transparent border-r-[170px] border-r-transparent bottom-0"></div>
            </div>
        </div>
    );
};

export default Loader;
