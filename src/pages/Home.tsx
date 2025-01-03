import React, {useEffect, useState} from "react";
import Banner from "../components/banner/Banner";
import PostsList from "../components/posts/PostsList";
import SearchBar from "../components/search/Searchbar";
import Loader from "../Loader";

import { Helmet } from "react-helmet";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [postList, setPostList] = useState([]);

    const fetchPostsForQuery = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/messages/filtered`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: searchQuery }),
            });
            const data = await response.json();
            setPostList(data.messages);
        } catch (error) {
            console.error("Error fetching posts for query:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllPosts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/messages`);
            const data = await response.json();
            setPostList(data.messages);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSearchClicked = () => {
        if (searchQuery && searchQuery.length > 0) {
            setIsLoading(true);
            fetchPostsForQuery();
        } else {
            setIsLoading(true);
            fetchAllPosts();
        }
    };

    useEffect(() => {
        if (searchQuery === "") {
            setIsLoading(true);
            fetchAllPosts();
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchAllPosts();
    }, []);

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
            <SearchBar setQueryValue={setSearchQuery} onSearchClicked={onSearchClicked} />
            <PostsList posts={postList} />
        </>
    );
};

export default Home;
