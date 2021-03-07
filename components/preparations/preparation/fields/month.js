import { DateTime } from "luxon";
import addZero from "../../../../utils/addZeroToUnit";
import removeZero from "../../../../utils/removeZeroFromUnit";
import { Field, CustomSelect } from "../../../../styles";

export default function DayComponent({ dt, setDt }) {
    const monthsInYear = [];

    for (let i = 1; i <= 12; i++) {
        monthsInYear.push(i.toString());
    }

    return (
        <Field>
            <CustomSelect>
                <span>Month:</span>
                <select
                    name="month"
                    id="month"
                    value={addZero(dt.month.toString())}
                    onChange={(e) => {
                        const tempDt = DateTime.fromObject({
                            day: 1,
                            month: removeZero(e.target.value),
                            year: dt.year,
                        });
                        setDt(
                            DateTime.fromObject({
                                day: dt.day > tempDt.daysInMonth ? 1 : dt.day,
                                month: removeZero(e.target.value),
                                year: dt.year,
                            })
                        );
                    }}
                >
                    {monthsInYear.map((m) => (
                        <option key={m}>{addZero(m)}</option>
                    ))}
                </select>
            </CustomSelect>
        </Field>
    );
}
