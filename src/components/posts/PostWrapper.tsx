import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import SinglePost from "./SinglePost";

interface MessageData {
    id: number;
    MessageTo: string;
    message: string;
    time: string;
    likes: number;
    shares: number;
    liked: boolean;
}

function PostWrapper() {
    const params = useParams<{ id: string }>();
    const [postData, setPostData] = useState<MessageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/messages/${params.id}`);
                if (!response.ok) {
                    new Error(`Error fetching post: ${response.statusText}`);
                }

                const data = await response.json();

                const {
                    id,
                    message,
                    messageTo,
                    likes,
                    shares,
                    timestamp,
                } = data.message;

                setPostData({
                    id,
                    message,
                    MessageTo: messageTo,
                    likes,
                    shares,
                    liked: false,
                    time: new Date(timestamp).toLocaleString()
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostData().then(r => r);
    }, [params.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!postData) {
        return <div>No post found.</div>;
    }

    return (
        <>
            <Helmet>
                <title>{`უთქმელი სიტყვები ${postData.MessageTo}ს, პოსტი #${postData.id} - რაც ვერ გითხარი`}</title>
                <meta
                    name="description"
                    content={`უთქმელი სიტყვები ${postData.MessageTo}ს, პოსტი ID: ${postData.id}`}
                />
                <meta property="og:title" content={`Post #${postData.id} - Untold Words`} />
                <meta
                    property="og:description"
                    content={`უთქმელი სიტყვები ${postData.MessageTo}, პოსტი ID: ${postData.id}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`http://localhost:3000/post/${postData.id}`} />
            </Helmet>
            <SinglePost
                id={postData.id}
                messageTo={postData.MessageTo}
                message={postData.message}
                time={postData.time}
                likes={postData.likes}
                shares={postData.shares}
                liked={postData.liked}
                onLike={() => console.log("Liked!")}
                onShare={() => console.log("Shared!")}
                onClick={() => console.log("Post clicked!")}
            />
        </>
    );
}

export default PostWrapper;
