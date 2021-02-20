import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import checkIfAuthorized from "../../utils/checkIfAuthorized";
import UserSettings from "../../components/user/settings";

export default function SettingsComponent({ data }) {
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
            router.push("/");
        } else {
            router.push("/");
        }
    }, []);
    return (
        <Layout>
            <Head title="Chefsbook posts" />
            <UserSettings user={data} />
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
