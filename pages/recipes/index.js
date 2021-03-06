import { useEffect, useContext } from "react";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import checkIfAuthorized from "../../utils/checkIfAuthorized";
import RecipesComponent from "../../components/recipes";

export default function RecipesPage({ data }) {
    if (data.error) {
        return <div>The following error occured: {data.error}</div>;
    }
    const { state, dispatch } = useContext(Context);
    // check only once at page load if there is user already logged in and if not if an auth cookie with token exist (data) and load it to the state
    useEffect(() => {
        if (state.user.email) {
            return;
        }
        if (data.email) {
            dispatch({ type: "isLogged", payload: true });
            dispatch({ type: "setUser", payload: data });
        } else if (data.error && state.isLogged === "pending") {
            dispatch({ type: "isLogged", payload: false });
        }
    }, []);
    return (
        <Layout>
            <Head title="Chefsbook posts" />
            <RecipesComponent />
        </Layout>
    );
}
export async function getServerSideProps(ctx) {
    try {
        const data = await checkIfAuthorized(ctx);
        return {
            props: {
                data,
            },
        };
    } catch (e) {
        return {
            props: {
                data: { error: e.toString() },
            },
        };
    }
}
