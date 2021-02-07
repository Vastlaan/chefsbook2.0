import React from "react";
import RegisterAccountForm from "../../components/auth/registerAccoutForm";
import About from "../../components/register/about";
import Layout from "../../globals/layout";
import { Main, ContainerNarrow, Grid } from "../../styles";

function CreateAccount() {
    return (
        <Layout>
            <Main url="/img/landing-header-background.jpg">
                <ContainerNarrow>
                    <Grid>
                        <About />
                        <RegisterAccountForm />
                    </Grid>
                </ContainerNarrow>
            </Main>
        </Layout>
    );
}

export default CreateAccount;
