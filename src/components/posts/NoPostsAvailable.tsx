import NoPost from "../../assets/icons/nopost.png";

function NoPostsAvailable() {
    return (
        <section className="w-[90%] md:w-[85%] flex flex-col mx-auto mt-10">
            <div className="flex flex-col items-center">
            <img src={NoPost} alt="message" className="w-64"/>
            </div>
        </section>
    );
}

export default NoPostsAvailable;