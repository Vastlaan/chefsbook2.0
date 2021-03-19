import RestoreCredentials from "../../components/auth/restore_credentials";
import About from "../../components/register/about";
import Layout from "../../globals/layout";
import { Main, ContainerNarrow, Grid } from "../../styles";

export default function RestoreCredentialsPage() {
    return (
        <Layout>
            <Main url="/img/landing-header-background.jpg">
                <ContainerNarrow>
                    <Grid>
                        <About />
                        <RestoreCredentials />
                    </Grid>
                </ContainerNarrow>
            </Main>
        </Layout>
    );
}
