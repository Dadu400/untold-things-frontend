import React from 'react';
import { Helmet } from 'react-helmet';

import NewPost from "../components/submit/NewPost";


const Submit = () => {
    return (
        <>
            <Helmet>
                <title>მიწერე წერილი - რაც ვერ გითხარი</title>
                <meta
                    name="description"
                    content="გააზიარეთ თქვენი ისტორია და გამოცდილება ჩვენს პლატფორმაზე. ახალი პოსტის დამატება."
                />
                <meta name="keywords" content="Georgian, stories, share, submit post, React" />
                <meta property="og:title" content="დამატე ახალი პოსტი - რაც ვერ გითხარი" />
                <meta
                    property="og:description"
                    content="დამატე ახალი პოსტი და გაიზიარე შენი ისტორია და გამოცდილება ქართულ პლატფორმაზე."
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ka_GE" />
            </Helmet>
            <NewPost />
        </>
    );
};

export default Submit;
