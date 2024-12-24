import { useEffect, useState } from 'react';
export interface Post {
    id: number;
    messageTo: string;
    message: string;
    timestamp: number;
    likes: number;
    shares: number;
}

interface useFetchProps {
    url: string;
}

const useFetch = ({ url }: useFetchProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.messages) {
                    setPosts(data.messages);
                } else {
                    console.error("No messages found in the response.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [url]);

    return { posts, loading };
};

export default useFetch;
