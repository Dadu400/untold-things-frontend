import MessageTo from "../../assets/icons/messageto.jpg";

function NoPostsAvailable() {
    return (
        <section className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4">
            <div className="flex flex-col items-center">
            <h2 className="font-dejavu text-3xl">ადრესატი არ მოიძებნა</h2>
            <img src={MessageTo} alt="message" className="w-72"/>
            </div>
            <div></div>
        </section>
    );
}

export default NoPostsAvailable;