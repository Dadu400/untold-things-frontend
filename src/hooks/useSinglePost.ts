import { useEffect, useState } from "react";

import { fetchSinglePost } from "../api/posts";

import { SinglePostProps } from "../types/types";

export const useSinglePost = (id: string) => {
    const [postData, setPostData] = useState<SinglePostProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        fetchSinglePost(id)
            .then(setPostData)
            .catch((err) => setError(err.message))
            .finally(() => setTimeout(() => setLoading(false), 1000));
    }, [id]);

    return { postData, loading, error };
};