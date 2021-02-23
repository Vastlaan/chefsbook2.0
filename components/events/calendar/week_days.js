import styled, { withTheme } from "styled-components";
import { respond, Text2 } from "../../../styles";
import { WEEK_DAYS } from "../../../utils/weekDays";

export default function WeekDaysComponent() {
    return (
        <WeekDays>
            {WEEK_DAYS.map((weekDay, i) => {
                return (
                    <div key={`week-day-${weekDay}-${i}`}>
                        <Text2
                            align="center"
                            color={weekDay === "Sunday" ? "orangered" : null}
                        >
                            {weekDay.substring(0, 3)}
                        </Text2>
                    </div>
                );
            })}
        </WeekDays>
    );
}
const WeekDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0.7rem;
    padding: 0 1.4rem;
    border-bottom: 1px solid ${(p) => p.theme.grey3};
    ${() => respond("s", ` grid-gap: 1.4rem; `)}
    ${() => respond("l", ` grid-gap: 2.7rem; `)}

    div {
        padding: 1.4rem 0;
        ${() => respond("s", ` padding: 1.4rem; `)}
    }
`;
