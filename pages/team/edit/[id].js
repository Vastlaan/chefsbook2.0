import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../globals/layout";
import Head from "../../../globals/head";
import { Context } from "../../../store";
import checkIfAuthorized from "../../../utils/checkIfAuthorized";
import EditMember from "../../../components/team/member/edit_member";

export default function CreateRecipeComponent({ data, id, week }) {
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
            router.push("/");
        }
    }, []);

    return (
        <Layout>
            <Head title="Edit Member" />

            <EditMember id={id} week={week} />
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const { id, week } = ctx.query;

    try {
        const data = await checkIfAuthorized(ctx);
        return {
            props: {
                data,
                id,
                week: week ? week : "0",
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
