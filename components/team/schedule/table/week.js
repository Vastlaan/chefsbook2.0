import { TableRow, PlainButton } from "../../../../styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export default function DateComponent({ theme, weekNumber, setWeek }) {
    return (
        <TableRow fill="true" color={theme.primary} colorFont={theme.white}>
            <PlainButton onClick={() => setWeek("previous")}>
                <RiArrowLeftSLine fill={theme.white} />
            </PlainButton>
            <p>{`Week: ${weekNumber}`}</p>
            <PlainButton onClick={() => setWeek("next")}>
                <RiArrowRightSLine fill={theme.white} />
            </PlainButton>
        </TableRow>
    );
}
