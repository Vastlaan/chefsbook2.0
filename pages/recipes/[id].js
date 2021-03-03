import { useEffect, useContext, useState } from "react";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import DetailRecipe from "../../components/recipes/recipe/detail_recipe";
import checkIfAuthorized from "../../utils/checkIfAuthorized";

export default function RecipeDetailsComponent({ data, recipe }) {
    if (data.error) {
        return <div>Custom Error Component: {data.error}</div>;
    }

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
            <DetailRecipe recipe={recipe} />
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    try {
        const data = await checkIfAuthorized(ctx);

        return {
            props: {
                data,
                recipe: data.recipes.find((r) => Number(r.id) == Number(id)),
            },
        };
    } catch (e) {
        return {
            props: {
                data: { error: "Ups, something went wrong" },
            },
        };
    }
}
