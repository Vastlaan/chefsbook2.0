import { DateTime } from "luxon";
import { TableRow } from "../../../styles";

export default function DateComponent({
    theme,
    weekStartingDay,
    weekEndingDay,
}) {
    return (
        <TableRow fill="true" color={theme.secondary} colorFont={theme.white}>
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
