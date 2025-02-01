import { Helmet } from "react-helmet";

import Banner from "../components/banner/Banner";
import PostsList from "../components/posts/PostsList";
import SearchBar from "../components/search/Searchbar";

import { usePosts } from "../hooks/usePosts";

const Home = () => {
    const { posts, loading, error,  setQuery, searchPosts } = usePosts();

    return (
        <>
            <Helmet>
                <title>არქივი - რაც ვერ გითხარი</title>
                <meta
                    name="description"
                    content="‘რაც ვერ გითხარი’ is a platform where Georgians can share their untold stories, personal experiences, and connect with others."
                />
                <meta name="keywords" content="Georgian, stories, React, social platform, personal experiences"/>
                <meta property="og:title" content="რაც ვერ გითხარი"/>
                <meta property="og:description" content="Discover untold stories and personal experiences."/>
                <meta property="og:image" content="https://i.imghippo.com/files/FTnu8581Boo.jpg"/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content="ka_GE"/>
            </Helmet>
            <Banner />
            <SearchBar setQueryValue={setQuery} onSearchClicked={searchPosts} />
            <PostsList posts={posts} loading={loading} error={error} />
        </>
    );
};

export default Home;
