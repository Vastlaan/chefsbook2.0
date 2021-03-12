import Head from "../globals/head";
import Layout from "../globals/layout";
import TermsComponent from "../components/terms";

export default function TermsPage() {
    return (
        <Layout>
            <Head robots="noindex, nofollow" />
            <TermsComponent />
        </Layout>
    );
}
