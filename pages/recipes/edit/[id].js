import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../globals/layout";
import Head from "../../../globals/head";
import { Context } from "../../../store";
import checkIfAuthorized from "../../../utils/checkIfAuthorized";
import EditRecipeForm from "../../../components/recipes/recipe/edit_recipe";

export default function CreateRecipeComponent({ data, id }) {
    if (data.error) {
        return <div>The following error occured: {data.error}</div>;
    }
    const router = useRouter();
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
            <Head />

            <EditRecipeForm id={id} />
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    try {
        const data = await checkIfAuthorized(ctx);
        return {
            props: {
                data,
                id,
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
