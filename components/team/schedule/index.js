import { useState, useContext } from "react";
import styled, { withTheme } from "styled-components";
import { DateTime } from "luxon";
import { Context } from "../../../store";
import Date from "./date";
import Week from "./week";
import Weekdays from "./weekdays";
import Plan from "./plan";
import {
    respond,
    FlexCol,
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
                    let scheduleForCurrentWeek = member.schedules.find(
                        (sch) => sch.week_number === weekNumber.toString()
                    );
                    if (!scheduleForCurrentWeek) {
                        scheduleForCurrentWeek = member.schedules.find(
                            (sch) => sch.week_number === "0"
                        );
                    }
                    const scheduleToRender = JSON.parse(
                        scheduleForCurrentWeek.schedule
                    );

                    return (
                        <Plan
                            key={`user-${i}-${member.full_name}`}
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

const TableGrid = styled.div`
    margin: 2.7rem 0rem;
    display: grid;
    grid-template-columns: minmax(15rem, 18rem) minmax(19rem, 1fr);
    overflow: auto;

    ${() =>
        respond(
            "s",
            `
            width: 100%;
            width: -moz-available;
            width: -webkit-fill-available;
            width: fill-available;
            `
        )}

    ${() =>
        respond(
            "l",
            `
              grid-template-columns: minmax(15rem, 25rem) minmax(25rem, 1fr);
              margin: 2.7rem 1.4rem;
            `
        )}
`;
