import React from "react";
import RegisterAccountForm from "../../components/auth/registerAccoutForm";
import About from "../../components/register/about";
import Layout from "../../globals/layout";
import { Header, ContainerNarrow, Grid } from "../../styles";

function CreateAccount() {
    return (
        <Layout>
            <Header url="/img/landing-header-background.jpg">
                <ContainerNarrow>
                    <Grid>
                        <About />
                        <RegisterAccountForm />
                    </Grid>
                </ContainerNarrow>
            </Header>
        </Layout>
    );
}

export default CreateAccount;
