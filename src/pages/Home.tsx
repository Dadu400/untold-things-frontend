import React, { useState } from "react";
import Banner from "../components/banner/Banner";
import PostsList from "../components/posts/PostsList";
import SearchBar from "../components/search/Searchbar";
import Loader from "../Loader";

import { Helmet } from "react-helmet";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <Helmet>
                <title>რაც ვერ გითხარი არქივი - რაც ვერ გითხარი</title>
                <meta
                    name="description"
                    content="‘რაც ვერ გითხარი’ is a platform where Georgians can share their untold stories, personal experiences, and connect with others."
                />
                <meta name="keywords" content="Georgian, stories, React, social platform, personal experiences" />
                <meta property="og:title" content="რაც ვერ გითხარი" />
                <meta
                    property="og:description"
                    content="Discover untold stories and personal experiences shared by Georgians on our platform."
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ka_GE" />
            </Helmet>
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <Loader />
                </div>
            )}
            <Banner />
            <SearchBar />
            <PostsList setLoading={setIsLoading} />
        </>
    );
};

export default Home;
