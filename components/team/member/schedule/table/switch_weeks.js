import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { TableRow, PlainButton } from "../../../../../styles";

export default function SwitchWeeksComponent({ forWeek, theme, setWeek }) {
    return (
        <TableRow
            disabled={forWeek === "0"}
            fill="true"
            color={theme.primary}
            colorFont={theme.white}
        >
            <PlainButton type="button" onClick={() => setWeek("previous")}>
                <RiArrowLeftSLine fill={theme.white} />
            </PlainButton>
            <p>{`Week: ${
                forWeek === "0" ? "Default (all weeks)" : forWeek
            }`}</p>
            <PlainButton type="button" onClick={() => setWeek("next")}>
                <RiArrowRightSLine fill={theme.white} />
            </PlainButton>
        </TableRow>
    );
}
