import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../../store";
import { WEEK_DAYS } from "../../../utils/weekDays";
import { respond } from "../../../styles";

export default function MonthDaysComponent({ startDate }) {
    const currentDay = startDate.day;

    const { state } = useContext(Context);

    const [currentMonthEvents, setCurrentMonthEvents] = useState([]);

    useEffect(() => {
        state.user.events &&
            setCurrentMonthEvents(
                state.user.events.filter(
                    (currentEvent) =>
                        currentEvent.month === startDate.month.toString() &&
                        currentEvent.year === startDate.year.toString()
                )
            );
    }, [startDate, state]);

    function generateMonthDaysArray(dt) {
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

    const monthDaysToRender = generateMonthDaysArray(startDate);

    const { month, year } = startDate;

    return (
        <MonthDays>
            {monthDaysToRender.map((day, i) => {
                const arrayOfDaysWhenEvent = [];
                currentMonthEvents.forEach((eve) =>
                    arrayOfDaysWhenEvent.push(eve.day)
                );

                if (!day) {
                    return <EmptyDay key={`day-${i}-${day}`}></EmptyDay>;
                } else if (arrayOfDaysWhenEvent.includes(day.toString())) {
                    return (
                        <Link
                            key={`day-${i}-${day}`}
                            href={`/events/details?day=${day}&month=${month}&year=${year}`}
                        >
                            <Day color="#6DAA6C">{day}</Day>
                        </Link>
                    );
                } else if (day === currentDay) {
                    return (
                        <Link
                            key={`day-${i}-${day}`}
                            href={`/events/details?day=${day}&month=${month}&year=${year}`}
                        >
                            <Day color="skyblue">{day}</Day>
                        </Link>
                    );
                } else {
                    return (
                        <Link
                            key={`day-${i}-${day}`}
                            href={`/events/details?day=${day}&month=${month}&year=${year}`}
                        >
                            <Day>{day}</Day>
                        </Link>
                    );
                }
            })}
        </MonthDays>
    );
}

const MonthDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0.7rem;
    grid-row-gap: 2.7rem;
    padding: 1.4rem;
    ${() => respond("s", ` grid-gap: 1.4rem; `)}
    ${() => respond("l", ` grid-gap: 2.7rem; `)}
`;
const Day = styled.div`
    color: ${(p) => (p.color ? p.color : p.theme.grey2)};
    font-size: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(p) => (p.color ? p.color : p.theme.grey3)};
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0.5rem;
    line-height: 1;
    ${() => respond("s", ` padding: 1.4rem; line-height: 1.6; `)}

    &:hover {
        background-color: ${(p) => (p.color ? p.color : p.theme.grey3)};
        color: ${(p) => (p.color ? p.theme.black : p.theme.grey2)};
    }
`;
const EmptyDay = styled(Day)`
    border: none;
    cursor: arrow;
    pointer-events: none;

    &:hover {
        background-color: transparent;
    }
`;
