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
            const allPosts = await fetchPosts(query.trim());
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
