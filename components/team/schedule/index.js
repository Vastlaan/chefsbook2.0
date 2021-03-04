import { useState, useContext } from "react";
import { withTheme } from "styled-components";
import { DateTime } from "luxon";
import { Context } from "../../../store";
import { SCHEDULE_UNDEFINED } from "../../../utils/scheduleUndefined";
import Date from "./date";
import Week from "./week";
import Weekdays from "./weekdays";
import Plan from "./plan";
import {
    FlexCol,
    TableGrid,
    TableRow,
    TopRow,
    BigText,
    Line,
} from "../../../styles";

function ScheduleComponent(props) {
    const { state } = useContext(Context);
    const [dt, setDt] = useState(DateTime.now());

    function addZero(unit) {
        return unit.toString().length === 1 ? `0${unit}` : unit.toString();
    }
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
    };
    const weekEndingDay = {
        day: addZero(dt.endOf("week").day),
        month: addZero(dt.endOf("week").month),
    };
    const weekNumber = dt.weekNumber;

    return (
        <FlexCol>
            <TopRow>
                <BigText>Team Schedule:</BigText>
            </TopRow>
            <Line />
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
        </FlexCol>
    );
}
export default withTheme(ScheduleComponent);
