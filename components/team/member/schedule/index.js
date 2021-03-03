import { useState } from "react";
import { DateTime } from "luxon";
import { withTheme } from "styled-components";
import TypeSchedule from "./type_schedule";
import Table from "./table";
import { FlexCol, TopRow, BigText } from "../../../../styles";

function ScheduleComponent(props) {
    const [dt, setDt] = useState(DateTime.now());
    const { forWeek, setForWeek } = props;
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
