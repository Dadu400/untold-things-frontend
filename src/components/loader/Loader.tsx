import "./Loader.css";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-rose-100 dark:bg-[#D93835] z-50">
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