import React from "react";
import Layout from "../globals/layout";
import Head from "../components/landing/head";
import Login from "../components/auth/login";
import About from "../components/landing/loggedout/about";
import { Header, ContainerNarrow, Grid } from "../styles";

function Landing() {
    return (
        <Layout>
            <Head />
            <Header url="/img/landing-header-background.jpg">
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

export default Landing;
