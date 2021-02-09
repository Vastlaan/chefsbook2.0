import React, { useState, useEffect, useContext } from "react";
import Layout from "../globals/layout";
import Head from "../globals/head";
import Loading from "../components/loading";
import LandingUnverified from "../components/landing_unveryfied";
import Landing from "../components/landing";
import { Context } from "../store";
import checkIfAuthorized from "../utils/checkIfAuthorized";

function Homepage() {
    const [isLogged, setIsLogged] = useState("pending");

    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (state.user.email) {
            return setIsLogged(true);
        }
        checkIfAuthorized()
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return setIsLogged(false);
                }
                if (data.type) {
                    return dispatch(data);
                } else {
                    return setIsLogged(false);
                }
            })
            .catch((e) => setIsLogged(false));
    }, [state.user]);

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
