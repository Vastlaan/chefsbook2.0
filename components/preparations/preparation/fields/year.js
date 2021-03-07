import { DateTime } from "luxon";
import { Field, CustomSelect } from "../../../../styles";

export default function DayComponent({ setDt, dt }) {
    const yearsToChoose = [dt.year, dt.plus({ year: 1 }).year];

    return (
        <Field>
            <CustomSelect>
                <span>Year:</span>
                <select
                    name="year"
                    id="year"
                    value={dt.year}
                    onChange={(e) => {
                        setDt(
                            DateTime.fromObject({
                                day: dt.day,
                                month: dt.month,
                                year: e.target.value,
                            })
                        );
                    }}
                >
                    {yearsToChoose.map((d) => (
                        <option key={d}>{d}</option>
                    ))}
                </select>
            </CustomSelect>
        </Field>
    );
}
