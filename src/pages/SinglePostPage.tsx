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
        <section className="flex flex-col mt-4 mb-8 md:mt-8 gap-5 px-4">
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
                    compact
                    className="border-[#ffcc00]/40 bg-[#ffcc00]/[0.08]"
                    text="წერილი გადამოწმების პროცესშია"
                    icon={warning}
                    altText="Pending"
                />
            )}

            {postData.messageStatus === "REJECTED" && (
                <div className="flex flex-col self-center items-center gap-y-2 rounded-2xl">
                    <WarningBadge
                        className="border-[#cc3300]/60"
                        text="წერილი უარყოფილია"
                        icon={Rejected}
                        altText="Rejected"
                    />
                    <a href="/terms" className="font-dejavu text-lg text-[#cc3300] underline-offset-4 hover:underline">გადახედე წესებს</a>
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
                className="animate-fade-up min-h-[380px] sm:min-h-[400px]"
            />
        </section>
    );
}

export default SinglePostPage;
