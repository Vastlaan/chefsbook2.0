import React, { useState, useEffect, useContext } from "react";
import { parse } from "cookie";
import Layout from "../globals/layout";
import Head from "../globals/head";
import Loading from "../components/loading";
import LandingUnverified from "../components/landing_unveryfied";
import Landing from "../components/landing";
import { Context } from "../store";
import checkIfAuthorized from "../utils/checkIfAuthorized";

function Homepage({ data }) {
    const { state, dispatch } = useContext(Context);

    const { isLogged } = state;

    // check only once at page load if there is an auth cookie with token
    useEffect(() => {
        if (data.email) {
            dispatch({ type: "isLogged", payload: true });
            dispatch({ type: "setUser", payload: data });
        } else if (data.error && state.isLogged === "pending") {
            dispatch({ type: "isLogged", payload: false });
        }
    }, []);

    //reload the page if the state has changed
    useEffect(() => {}, [state]);

    switch (isLogged) {
        case "pending":
            return (
                <Layout>
                    <Head />
                    <Loading />
                </Layout>
            );
        case true:
            return (
                <Layout>
                    <Head />
                    <Landing />
                </Layout>
            );
        case false:
            return (
                <Layout>
                    <Head />
                    <LandingUnverified />
                </Layout>
            );
        default:
            return (
                <Layout>
                    <Head />
                    <LandingUnverified />
                </Layout>
            );
    }
}

export default Homepage;

export async function getServerSideProps(ctx) {
    console.log(ctx.req.headers);
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
