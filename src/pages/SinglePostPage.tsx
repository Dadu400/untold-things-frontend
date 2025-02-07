import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import SinglePost from "../components/posts/SinglePost";
import WarningBadge from "../components/posts/WarningBadge";
import Loader from "../components/loader/Loader";

import warning from "../assets/icons/warning.svg";
import Rejected from "../assets/icons/rejected.svg";

import { useSinglePost } from "../hooks/useSinglePost";
import NoPostsAvailable from "../components/posts/NoPostsAvailable";

function SinglePostPage() {
    const { id } = useParams<{ id: string }>();
    const { postData, loading, error } = useSinglePost(id || "");

    if (loading) return <Loader />;
    if (error) return <NoPostsAvailable />;
    if (!postData) return <NoPostsAvailable />;

    return (
        <section className="flex flex-col my-2 gap-5">
            <Helmet>
                <title>{`უთქმელი სიტყვები ${postData.messageTo}ს, პოსტი #${postData.id} - რაც ვერ გითხარი`}</title>
                <meta name="description" content={`უთქმელი სიტყვები ${postData.messageTo}ს, პოსტი ID: ${postData.id}`} />
                <meta property="og:title" content={`Post #${postData.id} - Untold Words`} />
                <meta property="og:description" content={`უთქმელი სიტყვები ${postData.messageTo}, პოსტი ID: ${postData.id}`} />
                <meta property="og:image" content="https://i.imghippo.com/files/FTnu8581Boo.jpg" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://racvergitxari.ge/post/${postData.id}`} />
            </Helmet>

            {postData.messageStatus === "PENDING" && (
                <WarningBadge
                    className="border-[#ffcc00] bg-bg dark:bg-bgDark"
                    text="მიმდინარეობს წერილის გადამოწმება"
                    icon={warning}
                    altText="Pending"
                />
            )}

            {postData.messageStatus === "REJECTED" && (
                <div className="flex flex-col self-center items-center gap-y-2 bg-bgColor dark:bg-bgDark rounded-md">
                    <WarningBadge
                        className="border-[#cc3300] bg-bgColor dark:bg-bgDark"
                        text="წერილი უარყოფილია"
                        icon={Rejected}
                        altText="Rejected"
                    />
                    <a href="/terms" className="font-dejavu text-lg text-[#cc3300]">გადახედე წესებს</a>
                </div>
            )}

            <SinglePost
                id={postData.id}
                messageTo={postData.messageTo}
                message={postData.message}
                messageStatus={postData.messageStatus}
                timestamp={postData.timestamp}
                likes={postData.likes}
                shares={postData.shares}
                liked={false}
            />
        </section>
    );
}

export default SinglePostPage;
