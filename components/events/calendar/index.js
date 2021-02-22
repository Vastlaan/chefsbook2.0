import { DateTime } from "luxon";
import styled, { withTheme } from "styled-components";
import { respond, PlainButton, Heading6, Text2 } from "../../../styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function CalendarComponent(props) {
    const startDate = DateTime.now();
    const WEEK_DAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    console.log(startDate, startDate.startOf("month"));

    function generateWeekdaysArray(dt) {
        let arrayOfDaysInMonth = [];
        const howManyToSkip = WEEK_DAYS.indexOf(
            dt.startOf("month").weekdayLong
        );
        // populate array with empty spaces, to align with acctual weekday
        for (let i = 0; i < howManyToSkip; i++) {
            arrayOfDaysInMonth.push("");
        }
        // populate array with days in month
        for (let i = 1; i <= dt.daysInMonth; i++) {
            arrayOfDaysInMonth.push(i);
        }
        return arrayOfDaysInMonth;
    }

    const weekdaysToRender = generateWeekdaysArray(startDate);
    return (
        <Calendar>
            <Month>
                <PlainButton>
                    <RiArrowLeftSLine />
                </PlainButton>
                <div>
                    <Heading6 color={props.theme.black}>
                        {startDate.monthLong} {startDate.year}
                    </Heading6>
                </div>
                <PlainButton>
                    <RiArrowRightSLine />
                </PlainButton>
            </Month>
            <WeekDays>
                {WEEK_DAYS.map((weekDay, i) => {
                    return (
                        <div key={`week-day-${weekDay}-${i}`}>
                            <Text2 align="center">
                                {weekDay.substring(0, 3)}
                            </Text2>
                        </div>
                    );
                })}
            </WeekDays>
            <MonthDays>
                {weekdaysToRender.map((day, i) => {
                    if (!day) {
                        return <Day key={`day-${i}-${day}`}></Day>;
                    } else {
                        return <Day key={`day-${i}-${day}`}>{day}</Day>;
                    }
                })}
            </MonthDays>
        </Calendar>
    );
}

export default withTheme(CalendarComponent);

const Calendar = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${(p) => p.theme.primary};
    border-radius: 5px;
    overflow: hidden;
`;
const Month = styled.div`
    grid-column: 1/-1;
    display: flex;
    background-color: ${(p) => p.theme.primary};

    button {
        padding: 1.4rem 2.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        svg {
            color: ${(p) => p.theme.black};
        }
    }
    div {
        padding: 1.4rem 2.7rem;
        margin: 0 auto;

        h3 {
        }
    }
`;

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

const MonthDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0.7rem;
    padding: 1.4rem;
    ${() => respond("s", ` grid-gap: 1.4rem; `)}
    ${() => respond("l", ` grid-gap: 2.7rem; `)}
`;
const Day = styled.div`
    color: ${(p) => p.theme.grey2};
    font-size: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(p) => p.theme.grey3};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0.5rem;
    line-height: 1;
    ${() => respond("s", ` padding: 1.4rem; line-height: 1.6; `)}

    &:hover {
        background-color: ${(p) => p.theme.grey3};
    }
`;
