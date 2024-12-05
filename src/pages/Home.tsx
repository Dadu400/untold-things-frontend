import Banner from "../components/banner/Banner";
import PostsList from "../components/posts/PostsList";
import SearchBar from "../components/search/Searchbar";
const Home = () => {
    return (
        <>
            <Banner />
            <SearchBar />
            <PostsList />
        </>
    );
};

export default Home;