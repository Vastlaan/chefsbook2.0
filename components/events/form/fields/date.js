import { DateTime } from "luxon";
import { Field } from "../../../../styles";

export default function DateComponent({ day, month, year }) {
    return (
        <Field>
            <label>
                Date:{" "}
                <span>
                    {DateTime.fromObject({
                        day,
                        month,
                        year,
                    }).toLocaleString(DateTime.DATE_FULL)}
                </span>
            </label>
        </Field>
    );
}
