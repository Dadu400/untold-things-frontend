import { Helmet } from "react-helmet";

import TermsAndCondition from "../components/terms/TermsAndCondition";

function Terms() {
    return (
        <>
            <Helmet>
                <title>წესები და პირობები - რაც ვერ გითხარი</title>
                <link rel="icon" href="./favicon.ico" />
                <meta name="description" content="გაიგეთ ჩვენი პლატფორმის წესები და პირობები."/>
                <meta name="keywords" content="terms and conditions, privacy policy, React platform, Georgia"/>
                <meta property="og:image" content="https://i.imghippo.com/files/FTnu8581Boo.jpg"/>
            </Helmet>
            <TermsAndCondition/>
        </>
    )
}

export default Terms;