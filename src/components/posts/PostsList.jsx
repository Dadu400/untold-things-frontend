import SinglePost from "./SinglePost";

function PostsList() {
    return (
        <section className='w-[90%] p-4 flex flex-col'>
            <span className='text-xl font-light tracking-wider font-bpg'>ყოველთვის მინდოდა მეთქვა, რომ</span>
            <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 place-items-center'>
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