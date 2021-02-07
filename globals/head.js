import React from "react";
import Head from "next/head";

export default function HeadComponent({ title, description }) {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>
                {title || "Chefsbook - handy tool for professional kitchen"}
            </title>
            <meta
                name="description"
                content={
                    description ||
                    "This web application helps you organize your work in the professional kitchen. It allows you to create and manage schedules, events, recipes and preparations."
                }
                data-react-helmet="true"
            />
            {/* <link rel="apple-touch-icon" href="/logo192.png" /> */}

            <link rel="cannonical" href="https://chefsbook.org" />

            <meta property="og:type" content="article" />

            <meta
                property="og:title"
                content={
                    title || "Chefsbook - handy tool for professional kitchen"
                }
            />

            <meta
                property="og:description"
                content={
                    description ||
                    "This web application helps you organize your work in the professional kitchen. It allows you to create and manage schedules, events, recipes and preparations."
                }
            />

            {/* <meta property="og:image" content="/OGImageHomepage.png" /> */}

            <meta property="og:url" content="https://chefsbook.org" />

            <meta property="og:site_name" content="Chefsbook" />
        </Head>
    );
}
