import { TableRow } from "../../../styles";

export default function DateComponent({
    theme,
    weekStartingDay,
    weekEndingDay,
}) {
    return (
        <TableRow fill="true" color={theme.secondary} colorFont={theme.white}>
            <p>{`${weekStartingDay.day}.${weekStartingDay.month} - ${weekEndingDay.day}.${weekEndingDay.month}`}</p>
        </TableRow>
    );
}
