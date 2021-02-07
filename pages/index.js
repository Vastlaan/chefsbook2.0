import React, { useState, useEffect, useContext } from "react";
import Layout from "../globals/layout";
import Head from "../globals/head";
import Loading from "../components/loading";
import LandingUnverified from "../components/landing_unveryfied";
import Landing from "../components/landing";
import { Context } from "../store";

function Homepage() {
    const [isLogged, setIsLogged] = useState("pending");

    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (state.user.email) {
            return setIsLogged(true);
        }
        const token = window.localStorage.getItem("chefsbookJWTToken");
        if (!token) {
            return setIsLogged(false);
        }
        console.log(state.user, token);
        fetch("/api/currentUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setIsLogged(false);
                    return console.log(data.error);
                }
                // here sign user data to global store and set isLogged to true
                if (data.user) {
                    console.log(data.user);
                    return dispatch({
                        type: "setUser",
                        payload: data.user,
                    });
                }
                return;
            });
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
