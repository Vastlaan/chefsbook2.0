import React from "react";
import Login from "../auth/login";
import About from "./about";
import { Main, ContainerNarrow, Grid } from "../../styles";

export default function LandingUnverified() {
    return (
        <Main url="/img/landing-header-background.jpg">
            <ContainerNarrow>
                <Grid>
                    <About />
                    <Login />
                </Grid>
            </ContainerNarrow>
        </Main>
    );
}
