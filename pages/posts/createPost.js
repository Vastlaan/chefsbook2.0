import { useContext, useEffect } from "react";
import Layout from "../../globals/layout";
import Head from "../../globals/head";

import CreateRecipeComponent from "../../components/posts/create_post";
import { Context } from "../../store";
import checkIfAuthorized from "../../utils/checkIfAuthorized";

export default function CreatePostComponent({ data }) {
    const { state, dispatch } = useContext(Context);

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

            <CreateRecipeComponent />
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
