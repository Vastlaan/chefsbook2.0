import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { withTheme } from "styled-components";
import TypeSchedule from "./type_schedule";
import Table from "./table";
import { FlexCol, TopRow, BigText } from "../../../../styles";

function ScheduleComponent(props) {
    const { forWeek, setForWeek } = props;
    const [dt, setDt] = useState(DateTime.fromObject({ weekNumber: forWeek }));
    const weekNumber = dt.weekNumber;

    return (
        <FlexCol>
            <TopRow>
                <BigText>Plan Schedule:</BigText>
            </TopRow>

            <TypeSchedule
                forWeek={forWeek}
                setForWeek={setForWeek}
                weekNumber={weekNumber}
            />
            <Table {...props} dt={dt} setDt={setDt} />
        </FlexCol>
    );
}
export default withTheme(ScheduleComponent);
