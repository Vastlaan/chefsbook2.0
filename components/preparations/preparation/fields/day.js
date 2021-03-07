import { DateTime } from "luxon";
import addZero from "../../../../utils/addZeroToUnit";
import removeZero from "../../../../utils/removeZeroFromUnit";
import { Field, CustomSelect } from "../../../../styles";

export default function DayComponent({ dt, setDt }) {
    let daysInMonth = [];

    for (let i = 1; i <= dt.daysInMonth; i++) {
        daysInMonth.push(i.toString());
    }

    return (
        <Field>
            <CustomSelect>
                <span>Day:</span>
                <select
                    name="day"
                    id="day"
                    value={addZero(dt.day.toString())}
                    onChange={(e) => {
                        setDt(
                            DateTime.fromObject({
                                day: removeZero(e.target.value),
                                month: dt.month,
                                year: dt.year,
                            })
                        );
                    }}
                >
                    {daysInMonth.map((day) => {
                        return <option key={day}>{addZero(day)}</option>;
                    })}
                </select>
            </CustomSelect>
        </Field>
    );
}
