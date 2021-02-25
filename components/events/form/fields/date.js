import { Field } from "../../../../styles";

export default function DateComponent({ day, month, year }) {
    return (
        <Field>
            <label>
                Date:{" "}
                <span>
                    {` ${day.length === 1 ? `0${day}` : day}-${
                        month.length === 1 ? `0${month}` : month
                    }-${year}`}
                </span>
            </label>
        </Field>
    );
}
