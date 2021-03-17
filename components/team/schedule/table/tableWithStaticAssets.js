import styled from "styled-components";
import { SCHEDULE_UNDEFINED } from "../../../../utils/scheduleUndefined";
import addZero from "../../../../utils/addZeroToUnit";
import Weekdays from "./weekdays";
import Plan from "./plan";
import { TableGrid, TableRow } from "../../../../styles";

export default function TableGirdComponent({ theme, dt, members }) {
    function generateScheduleToRender(member) {
        let scheduleForCurrentWeek = member.schedules.find(
            (sch) => sch.week_number === weekNumber.toString()
        );
        if (!scheduleForCurrentWeek) {
            scheduleForCurrentWeek = member.schedules.find(
                (sch) => sch.week_number === "0"
            );

            if (!scheduleForCurrentWeek) {
                scheduleForCurrentWeek = SCHEDULE_UNDEFINED;
            }
        }
        const scheduleToRender = JSON.parse(scheduleForCurrentWeek.schedule);
        return scheduleToRender;
    }

    const weekStartingDay = {
        day: addZero(dt.startOf("week").day),
        month: addZero(dt.startOf("week").month),
        year: addZero(dt.startOf("week").year),
    };
    const weekEndingDay = {
        day: addZero(dt.endOf("week").day),
        month: addZero(dt.endOf("week").month),
        year: addZero(dt.endOf("week").year),
    };
    const weekNumber = dt.weekNumber;

    return (
        <CustomTableGrid>
            <TableRow
                fill="true"
                color={theme.secondary}
                colorFont={theme.white}
            >
                <p>Schedule for week: {weekNumber}</p>
            </TableRow>

            <TableRow color={theme.secondary}>
                <p>
                    from: {weekStartingDay.day}-{weekStartingDay.month} till:{" "}
                    {weekEndingDay.day}-{weekEndingDay.month}
                </p>
            </TableRow>

            <Weekdays dt={dt} />

            {members.map((member, i) => {
                const scheduleToRender = generateScheduleToRender(member);

                return (
                    <Plan
                        key={`user-${i}-${member.full_name}`}
                        weekNumber={weekNumber}
                        member={member}
                        theme={theme}
                        scheduleToRender={scheduleToRender}
                        iteration={i}
                    />
                );
            })}
        </CustomTableGrid>
    );
}
const CustomTableGrid = styled(TableGrid)`
    * {
        font-size: 12px !important;
        padding: 0px !important;
        margin: 0 !important;
    }
`;
