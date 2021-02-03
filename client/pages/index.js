import React, { useContext } from "react";
import styled from "styled-components";
import Layout from "../globals/layout";
import Head from "next/head";
import Login from "../components/auth/login";
import About from "../components/landing/loggedout/about";
import { colors } from "../styles";
import { Context } from "../store";

function Landing() {
    // const { state, dispatch } = useContext(Context);
    // console.log(state.user, dispatch);
    return (
        <Layout>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Chefsbook - handy tool for professional kitchen</title>
                <meta
                    name="description"
                    content="This web application helps you organize your work in the professional kitchen. It allows you to create and manage schedules, events, recipes and preparations."
                    data-react-helmet="true"
                />
                {/* <link rel="apple-touch-icon" href="/logo192.png" /> */}

                <link rel="cannonical" href="https://chefsbook.org" />

                <meta property="og:type" content="article" />

                <meta
                    property="og:title"
                    content="Chefsbook - handy tool for professional kitchen"
                />

                <meta
                    property="og:description"
                    content="This web application helps you organize your work in the professional kitchen. It allows you to create and manage schedules, events, recipes and preparations."
                />

                {/* <meta property="og:image" content="/OGImageHomepage.png" /> */}

                <meta property="og:url" content="https://chefsbook.org" />

                <meta property="og:site_name" content="Chefsbook" />
            </Head>
            <Header>
                <ContainerNarrow>
                    <Grid>
                        <About />
                        <Login />
                    </Grid>
                </ContainerNarrow>
            </Header>
        </Layout>
    );
}

const Header = styled.header`
    padding-top: 5.3rem;
    background-image: ${(p) => `linear-gradient(
            to bottom,
            rgba(${p.theme.grey1RGB}, 1),
            rgba(${p.theme.grey1RGB}, 0.7)
        )`},
        url("/img/landing-header-background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 90%;
`;
const ContainerNarrow = styled.div`
    max-width: 1255px;
    margin: 0 auto;
`;
const Grid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 6.7rem 2.7rem;
    gap: 2.7rem;
`;

export default Landing;
