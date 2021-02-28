import { useEffect, useContext } from "react";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import PreparationsComponent from "../../components/preparations";
import checkIfAuthorized from "../../utils/checkIfAuthorized";

export default function PreparationsPage({ data }) {
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
            <Head title="Preparation Lists" />
            <PreparationsComponent />
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
