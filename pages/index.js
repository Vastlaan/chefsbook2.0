import React, { useState, useEffect, useContext } from "react";
import Layout from "../globals/layout";
import Head from "../globals/head";
import Loading from "../components/loading";
import LandingUnverified from "../components/landing/loggedout";
import { Context } from "../store";

function Landing() {
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
                    return dispatch({
                        type: "setUser",
                        payload: data.user,
                    });
                }
                return;
            });
    }, [state.user]);

    if (isLogged === "pending") {
        return (
            <Layout>
                <Head />
                <Loading />
            </Layout>
        );
    }
    return (
        <Layout>
            <Head />
            {isLogged ? (
                <h1>This is core of the application</h1>
            ) : (
                <LandingUnverified />
            )}
        </Layout>
    );
}

export default Landing;
