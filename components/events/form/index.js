import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Context } from "../../../store";
import Time from "../time";
import EventTime from "./fields/time";
import Description from "./fields/description";
import Date from "./fields/date";
import { validateText } from "../../../validations";
import {
    Form1,
    Heading3,
    Field,
    ButtonPrimary,
    TopRow,
    Line,
    Options,
    GoBack,
    FlexRow,
} from "../../../styles";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function CreateRecipeComponent({ day, month, year }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("00");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    function createEvent(e) {
        e.preventDefault();
        if (!hour || !minute) {
            return setErrors({
                type: "error",
                field: "time",
                message: "Please pick up the time",
            });
        }
        if (!description) {
            return setErrors({
                type: "error",
                field: "description",
                message: "Please fill in event's description",
            });
        }
        const dataToSend = {
            year,
            month,
            day,
            hour,
            minute,
            description,
        };

        fetch("/api/events/createEvent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((req) => req.json())
            .then((data) => {
                if (data.error) {
                    return setErrors({
                        type: "error",
                        field: "general",
                        message: "Something went wrong",
                    });
                }
                dispatch({ type: "updateCreatedEvent", payload: data.event });
                router.push("/events");
            })
            .catch((e) => console.log(e));
    }

    return (
        <Form1 onSubmit={createEvent}>
            <TopRow>
                <Heading3>New Event</Heading3>
                <Time />
            </TopRow>
            <Line />
            <Options marginTop="unset" alignItems="center">
                <Link href="/events">
                    <GoBack>
                        <RiArrowGoBackLine />
                    </GoBack>
                </Link>
            </Options>
            <Line />

            <Date day={day} month={month} year={year} />

            <EventTime
                setHour={setHour}
                setMinute={setMinute}
                errors={errors}
            />

            <Description setDescription={setDescription} errors={errors} />

            <ButtonField>
                {errors.field === "general" ? (
                    <small>{errors.message}</small>
                ) : null}
                <ButtonPrimary type="submit">Create</ButtonPrimary>
            </ButtonField>
        </Form1>
    );
}

const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;
