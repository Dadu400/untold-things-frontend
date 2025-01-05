import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import SinglePost from "../components/posts/SinglePost";
import WarningBadge from "../components/posts/WarningBadge";

import warningGif from "../assets/icons/warning.gif";
import Rejected from "../assets/icons/rejected.svg";
import Loader from "../Loader";

interface MessageData {
    id: number;
    MessageTo: string;
    message: string;
    timestamp: number;
    likes: number;
    shares: number;
    liked: boolean;
    messageStatus: string;
}

function SinglePostPage() {
    const params = useParams<{ id: string }>();
    const [postData, setPostData] = useState<MessageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
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
                    messageStatus
                } = data.message;

                setPostData({
                    id,
                    message,
                    MessageTo: messageTo,
                    likes,
                    shares,
                    liked: false,
                    timestamp,
                    messageStatus,
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchPostData().then(r => r);
    }, [params.id]);

    if (!postData || loading) {
        return <Loader />;
    }

    return (
        <section className="flex flex-col my-2 gap-5">
            <Helmet>
                <title>{`უთქმელი სიტყვები ${postData.MessageTo}ს, პოსტი #${postData.id} - რაც ვერ გითხარი`}</title>
                <meta name="description" content={`უთქმელი სიტყვები ${postData.MessageTo}ს, პოსტი ID: ${postData.id}`} />
                <meta property="og:title" content={`Post #${postData.id} - Untold Words`} />
                <meta property="og:description" content={`უთქმელი სიტყვები ${postData.MessageTo}, პოსტი ID: ${postData.id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://racvergitxari.ge/post/${postData.id}`} />
            </Helmet>
            {postData.messageStatus === "PENDING" && (
                <WarningBadge
                    className="border-[#ffcc00]"
                    text="მიმდინარეობს წერილის გადამოწმება"
                    icon={warningGif}
                    altText="Pending"
                />
            )}
            {postData.messageStatus === "REJECTED" && (
                <div className="flex flex-col self-center items-center gap-y-2 bg-white">
                    <WarningBadge
                    className="border-[#cc3300]"
                    text="წერილი უარყოფილია"
                    icon={Rejected}
                    altText="Rejected"
                    />
                    <a href="/terms" className="font-dejavu text-lg text-[#cc3300]">გადახედე წესებს</a>
                </div>
            )}
            <SinglePost
                id={postData.id}
                messageTo={postData.MessageTo}
                message={postData.message}
                status={postData.messageStatus}
                timestamp={postData.timestamp}
                likes={postData.likes}
                shares={postData.shares}
                liked={postData.liked}
                onLike={() => console.log("Liked!")}
                onShare={() => console.log("Shared!")}
                onClick={() => console.log("Post clicked!")}
            />
        </section>
    );
}

export default SinglePostPage;
