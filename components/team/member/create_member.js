import { useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Context } from "../../../store";
import MainGridComponent from "../../main_grid";
import Options from "./options";
import Name from "./name";
import Email from "./email";
import Schedule from "./schedule";
import { Form1, Field, Heading3, Line, ButtonPrimary } from "../../../styles";

export default function TeamComponent() {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [forWeek, setForWeek] = useState("0");
    const [monday, setMonday] = useState("10:00 - 18:00");
    const [tuesday, setTuesday] = useState("10:00 - 18:00");
    const [wednesday, setWednesday] = useState("10:00 - 18:00");
    const [thursday, setThursday] = useState("10:00 - 18:00");
    const [friday, setFriday] = useState("10:00 - 18:00");
    const [saturday, setSaturday] = useState("free");
    const [sunday, setSunday] = useState("free");
    const [errors, setErrors] = useState({});

    async function registerNewMember(e) {
        e.preventDefault();

        setErrors({});

        if (!fullName) {
            return setErrors({
                type: "error",
                field: "name",
                message: "You need to provide name",
            });
        }
        // construct schedule object
        const schedule = {
            week_number: forWeek,
            schedule: JSON.stringify({
                Monday: monday,
                Tuesday: tuesday,
                Wednesday: wednesday,
                Thursday: thursday,
                Friday: friday,
                Saturday: saturday,
                Sunday: sunday,
            }),
        };

        const dataToSend = {
            fullName,
            email,
            schedule,
        };
        console.log(dataToSend);

        // send to database
        try {
            const res = await fetch("/api/team/registerMember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            const data = await res.json();

            if (data.error) {
                return console.error(data.error);
            }
            if (data.members) {
                dispatch({
                    type: "updateMembers",
                    payload: data.members,
                });
                router.push("/team");
            }
        } catch (e) {
            console.error(e);
            setErrors({
                type: "error",
                field: "general",
                message: "Ups, something went wrong",
            });
        }
    }

    return (
        <MainGridComponent>
            <Form1 onSubmit={registerNewMember}>
                <Heading3>Register New Member</Heading3>
                <Line />

                <Options />
                <Line />

                <Name
                    setFullName={setFullName}
                    fullName={fullName}
                    errors={errors}
                />

                <Email email={email} setEmail={setEmail} />

                <Schedule
                    forWeek={forWeek}
                    setForWeek={setForWeek}
                    monday={monday}
                    setMonday={setMonday}
                    tuesday={tuesday}
                    setTuesday={setTuesday}
                    wednesday={wednesday}
                    setWednesday={setWednesday}
                    thursday={thursday}
                    setThursday={setThursday}
                    friday={friday}
                    setFriday={setFriday}
                    saturday={saturday}
                    setSaturday={setSaturday}
                    sunday={sunday}
                    setSunday={setSunday}
                />

                <ButtonField>
                    {errors.field === "general" ? (
                        <small>{errors.message}</small>
                    ) : null}
                    <ButtonPrimary type="submit">Register Member</ButtonPrimary>
                </ButtonField>
            </Form1>
        </MainGridComponent>
    );
}
const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;
