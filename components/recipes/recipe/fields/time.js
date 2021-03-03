import { Field } from "../../../../styles";

export default function Time({ time, setTime, errors }) {
    return (
        <Field>
            <label htmlFor="time">Preparation Time:</label>
            <input
                type="text"
                name="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            {errors.field === "time" ? <small>{errors.message}</small> : null}
        </Field>
    );
}
