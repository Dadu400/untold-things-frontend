import { useState, useEffect } from "react";
import { fetchAllPosts, fetchPostsForQuery } from "../api/posts";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                const allPosts = await fetchAllPosts();
                setPosts(allPosts);
            } catch (err) {
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    const searchPosts = async () => {
        if (!query.trim()) {
            setLoading(true);
            try {
                const allPosts = await fetchAllPosts();
                setPosts(allPosts);
            } catch (err) {
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const results = await fetchPostsForQuery(query);
            setPosts(results);
        } catch (err) {
            setError("Error fetching search results.");
        } finally {
            setLoading(false);
        }
    };

    return { posts, loading, error, query, setQuery, searchPosts };
};
