import styled from "styled-components";
import { Field } from "../../../../styles";

export default function TypeScheduleComponent({
    setForWeek,
    forWeek,
    weekNumber,
}) {
    return (
        <Field>
            <RadioButtons>
                <input
                    type="radio"
                    name="type"
                    id="default"
                    checked={forWeek === "0"}
                    onChange={() => setForWeek("0")}
                />
                <label htmlFor="default">Default</label>
                <br />
                <input
                    type="radio"
                    name="type"
                    id="currentWeek"
                    checked={forWeek !== "0"}
                    onChange={() => setForWeek(weekNumber.toString())}
                />
                <label htmlFor="currentWeek">
                    Week: {forWeek === "0" ? "Default" : forWeek}
                </label>
            </RadioButtons>
        </Field>
    );
}
const RadioButtons = styled.div`
    display: flex;
    align-items: center;

    label {
        margin: 0;
        margin-right: 1.4rem;
    }
    input {
        margin-right: 0.7rem;
    }
`;
