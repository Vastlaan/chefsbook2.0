import { useEffect, useContext } from "react";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import checkIfAuthorized from "../../utils/checkIfAuthorized";
import YourRecipes from "../../components/recipes/your_recipes";
import Recipes from "../recipes";

export default function Blank({ data, children }) {
    const { state, dispatch } = useContext(Context);
    console.log(data);

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
            <Recipes data={data} />
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
