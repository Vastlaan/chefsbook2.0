import { useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import MonthPanel from "./month_panel";
import WeekDays from "./week_days";
import MonthDays from "./month_days";

export default function CalendarComponent(props) {
    const [startDate, setStartDate] = useState(DateTime.now());

    console.log(startDate);

    return (
        <Calendar>
            <MonthPanel startDate={startDate} setStartDate={setStartDate} />

            <WeekDays />

            <MonthDays startDate={startDate} />
        </Calendar>
    );
}

const Calendar = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${(p) => p.theme.primary};
    border-radius: 5px;
`;
