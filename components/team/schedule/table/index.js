import { useState, useContext } from "react";
import { DateTime } from "luxon";
import { Context } from "../../../../store";
import { SCHEDULE_UNDEFINED } from "../../../../utils/scheduleUndefined";
import addZero from "../../../../utils/addZeroToUnit";
import Date from "./date";
import Week from "./week";
import Weekdays from "./weekdays";
import Plan from "./plan";
import { TableGrid, TableRow } from "../../../../styles";

export default function TableGirdComponent({ props, dt, setDt }) {
    const { state } = useContext(Context);

    function setWeek(direction) {
        if (direction === "previous") {
            setDt((prevState) => prevState.minus({ week: 1 }));
        } else {
            setDt((prevState) => prevState.plus({ week: 1 }));
        }
    }

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
        <TableGrid>
            <Date
                theme={props.theme}
                weekStartingDay={weekStartingDay}
                weekEndingDay={weekEndingDay}
            />

            <Week
                theme={props.theme}
                weekNumber={weekNumber}
                setWeek={setWeek}
            />

            <TableRow color={props.theme.secondary}>
                <p>Team Member</p>
            </TableRow>

            <Weekdays dt={dt} />

            {state.user.members.map((member, i) => {
                const scheduleToRender = generateScheduleToRender(member);

                return (
                    <Plan
                        key={`user-${i}-${member.full_name}`}
                        weekNumber={weekNumber}
                        member={member}
                        theme={props.theme}
                        scheduleToRender={scheduleToRender}
                        iteration={i}
                    />
                );
            })}
        </TableGrid>
    );
}
