import { DateTime } from "luxon";
import Time from "../time";
import { Heading6, TopRow } from "../../../styles";

export default function TopPanel({ day, month, year }) {
    return (
        <TopRow>
            <Heading6 color="#6DAA6C">
                Events for:{" "}
                <span>
                    {DateTime.fromObject({ day, month, year }).toLocaleString(
                        DateTime.DATE_FULL
                    )}
                </span>
            </Heading6>
            <Time />
        </TopRow>
    );
}
