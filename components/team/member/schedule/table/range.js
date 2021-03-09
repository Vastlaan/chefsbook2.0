import { DateTime } from "luxon";
import { TableRow } from "../../../../../styles";
import addZero from "../../../../../utils/addZeroToUnit";

export default function RangeComponent({ theme, forWeek, dt }) {
    const weekStartingDay = {
        day: addZero(dt.startOf("week").day),
        month: addZero(dt.startOf("week").month),
        year: addZero(dt.startOf("week").year),
    };
    const weekEndingDay = {
        day: addZero(dt.endOf("week").day),
        month: addZero(dt.endOf("week").month),
        year: addZero(dt.endOf("week").year),
    };

    return (
        <TableRow
            disabled={forWeek === "0"}
            fill="true"
            color={theme.secondary}
            colorFont={theme.white}
        >
            <p>
                {
                    DateTime.fromObject({
                        day: weekStartingDay.day,
                        month: weekStartingDay.month,
                        year: weekStartingDay.year,
                    })
                        .toLocaleString(DateTime.DATE_MED)
                        .split(",")[0]
                }
                {" - "}
                {
                    DateTime.fromObject({
                        day: weekEndingDay.day,
                        month: weekEndingDay.month,
                        year: weekEndingDay.year,
                    })
                        .toLocaleString(DateTime.DATE_MED)
                        .split(",")[0]
                }
            </p>
        </TableRow>
    );
}
