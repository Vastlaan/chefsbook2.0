import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Context } from "../../../store";
import MainGridComponent from "../../main_grid";
import Options from "./options";
import Name from "./name";
import Email from "./email";
import Schedule from "./schedule";
import { Form1, Field, Heading3, Line, ButtonPrimary } from "../../../styles";

export default function EditMemberComponent({ id, week }) {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [forWeek, setForWeek] = useState(week.toString());
    const [monday, setMonday] = useState("free");
    const [tuesday, setTuesday] = useState("free");
    const [wednesday, setWednesday] = useState("free");
    const [thursday, setThursday] = useState("free");
    const [friday, setFriday] = useState("free");
    const [saturday, setSaturday] = useState("free");
    const [sunday, setSunday] = useState("free");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const editMember = state.user.members.find(
            (m) => m.id.toString() === id.toString()
        );
        if (!editMember) {
            return router.push("/team");
        }

        if (editMember) {
            let schedule = editMember.schedules.find(
                (sch) => sch.week_number === forWeek
            );

            if (!schedule) {
                schedule = editMember.schedules[0];
            }
            const scheduleObject = JSON.parse(schedule.schedule);

            setFullName(editMember.full_name);
            setEmail(editMember.email);
            // setForWeek(schedule.week_number);
            setMonday(scheduleObject.Monday);
            setTuesday(scheduleObject.Tuesday);
            setWednesday(scheduleObject.Wednesday);
            setThursday(scheduleObject.Thursday);
            setFriday(scheduleObject.Friday);
            setSaturday(scheduleObject.Saturday);
            setSunday(scheduleObject.Sunday);
        }
    }, [forWeek]);

    async function updateMember(e) {
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
            schedule: schedule.schedule,
            id,
            week: forWeek,
        };

        // send to database
        try {
            const res = await fetch("/api/team/updateMember", {
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
            <Form1 onSubmit={updateMember}>
                <Heading3>Update Member</Heading3>
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
                    <ButtonPrimary type="submit">Update Member</ButtonPrimary>
                </ButtonField>
            </Form1>
        </MainGridComponent>
    );
}
const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;
