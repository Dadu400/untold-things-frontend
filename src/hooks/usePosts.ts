import { useState, useEffect } from "react";
import { fetchPosts } from "../api/posts";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const searchPosts = async () => {
        setLoading(true);
        try {
            const CURR_PAGE = "0";
            const PAGE_SIZE = "100";
            const allPosts = await fetchPosts(query.trim(), CURR_PAGE, PAGE_SIZE);
            setPosts(allPosts);
        } catch (err) {
            setError("Failed to load posts.");
        } finally {
            setLoading(false);
        }
        return;
    };

    useEffect(() => {
        searchPosts();
    }, []);


    return { posts, loading, error, query, setQuery, searchPosts };
};
