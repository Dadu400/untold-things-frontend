import { Helmet } from "react-helmet";

import TermsAndCondition from "../components/TermsAndCondition";

function Terms() {
    return (
        <>
            <Helmet>
                <title>წესები და პირობები - რაც ვერ გითხარი</title>
                <meta
                    name="description"
                    content="გაიგეთ ჩვენი პლატფორმის წესები და პირობები. როგორ უნდა გამოიყენოთ 'რაც ვერ გითხარი' უსაფრთხოდ და შესაბამისად."
                />
                <meta name="keywords" content="terms and conditions, privacy policy, React platform, Georgia" />
            </Helmet>
            <TermsAndCondition />
        </>
    )
}

export default Terms;