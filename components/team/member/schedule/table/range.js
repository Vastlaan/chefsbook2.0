import { TableRow } from "../../../../../styles";
import addZero from "../../../../../utils/addZeroToUnit";

export default function RangeComponent({ theme, forWeek, dt }) {
    const weekStartingDay = {
        day: addZero(dt.startOf("week").day),
        month: addZero(dt.startOf("week").month),
    };
    const weekEndingDay = {
        day: addZero(dt.endOf("week").day),
        month: addZero(dt.endOf("week").month),
    };

    return (
        <TableRow
            disabled={forWeek === "0"}
            fill="true"
            color={theme.secondary}
            colorFont={theme.white}
        >
            <p>{`${weekStartingDay.day}.${weekStartingDay.month} - ${weekEndingDay.day}.${weekEndingDay.month}`}</p>
        </TableRow>
    );
}
