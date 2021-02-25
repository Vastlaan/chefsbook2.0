import { useEffect, useContext } from "react";
import { Context } from "../../store";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import CreateNewEvent from "../../components/events/create_new_event";
import checkIfAuthorized from "../../utils/checkIfAuthorized";

export default function CreateNewEventPage({ data, date }) {
    if (data.error) {
        return <div>Custom Error Component: {data.error}</div>;
    }
    const { day, month, year } = date;
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
            <Head title="Create New Event" />
            <CreateNewEvent day={day} month={month} year={year} />
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const data = await checkIfAuthorized(ctx);
        return {
            props: {
                data,
                date: ctx.query,
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
