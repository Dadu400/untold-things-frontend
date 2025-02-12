import { Helmet } from "react-helmet";

import Banner from "../components/banner/Banner";
import PostsList from "../components/posts/PostsList";
import SearchBar from "../components/search/Searchbar";

import { usePosts } from "../hooks/usePosts";
import { useState } from "react";
import { SinglePostProps } from "../types/types";

const Home = () => {
    const [query, setQuery] = useState('');
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = usePosts(query);


    const searchPosts = (query: string) => {
        setQuery(query);
    }
    
    const formatData = (data: any) => {
        let formattedData: SinglePostProps[] = [];
        if (data && data.pages) {
            data.pages.forEach((page: SinglePostProps[]) => {
                formattedData = formattedData.concat(page);
            });
        }
        return formattedData;
    }

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
            <SearchBar onSearchClicked={searchPosts} />
            <PostsList posts={formatData(data)} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} loading={isFetchingNextPage} isInitialLoading={isLoading} />
        </>
    );
};

export default Home;
