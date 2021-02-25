import Time from "../time";
import { BigText, TopRow } from "../../../styles";

export default function TopPanel({ day, month, year }) {
    return (
        <TopRow>
            <BigText>
                Events for
                <span>
                    {` ${day.length === 1 ? `0${day}` : day}-${
                        month.length === 1 ? `0${month}` : month
                    }-${year}`}
                </span>
            </BigText>
            <Time />
        </TopRow>
    );
}
