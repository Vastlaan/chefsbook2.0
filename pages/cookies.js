import Head from "../globals/head";
import Layout from "../globals/layout";
import CookiesComponent from "../components/cookies";

export default function CookiesPage() {
    return (
        <Layout>
            <Head robots="noindex, nofollow" />
            <CookiesComponent />
        </Layout>
    );
}
