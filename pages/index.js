import React, { useState, useEffect } from "react";
import Layout from "../globals/layout";
import Head from "../components/landing/head";
import LandingUnverified from "../components/landing/loggedout";

function Landing() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("chefsbookJWTToken");
        if (token) {
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
                        return console.log(data.error);
                    }
                    // here sign user data to global store and set isLogged to true
                    return data.user;
                });
        }
    });
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
