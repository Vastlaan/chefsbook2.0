import { useEffect, useContext, useState } from "react";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import EventDetails from "../../components/events/event_details";
import checkIfAuthorized from "../../utils/checkIfAuthorized";

export default function EventDetailsComponent({ data, currentDay }) {
    if (data.error) {
        return <div>Custom Error Component: {data.error}</div>;
    }

    const { day, month, year } = currentDay;

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
            <EventDetails
                day={day}
                month={month}
                year={year}
                events={data.events}
            />
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const data = await checkIfAuthorized(ctx);

        return {
            props: {
                data,
                currentDay: ctx.query,
            },
        };
    } catch (e) {
        return {
            props: {
                data: { error: "Ups, something went wrong" },
                currentDay: null,
            },
        };
    }
}
