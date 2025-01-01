import React from "react";
import "./Loader.css";

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-rose-100">
            <div className="wing right"></div>
            <div className="wing left"></div>
            <div className="heart"></div>
            <div id="envelope">
                <div className="top"></div>
                <div className="sides"></div>
            </div>
        </div>
    );
};

export default Loader;
