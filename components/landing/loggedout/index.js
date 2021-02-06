import React from "react";
import Login from "../../auth/login";
import About from "./about";
import { Header, ContainerNarrow, Grid } from "../../../styles";

export default function LandingUnverified() {
    return (
        <Header url="/img/landing-header-background.jpg">
            <ContainerNarrow>
                <Grid>
                    <About />
                    <Login />
                </Grid>
            </ContainerNarrow>
        </Header>
    );
}
