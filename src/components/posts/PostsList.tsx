import SinglePost from "./SinglePost";
import TypedText from "./TypedText";

function PostsList() {
    return (
        <section className='w-[90%] md:w-[85%] flex flex-col mx-auto my-20'>
            <TypedText />
            <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mt-10 place-items-center'>
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
                <SinglePost />
            </div>
        </section>
    );
}

export default PostsList;