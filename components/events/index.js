import { DateTime } from "luxon";
import MainGridComponent from "../main_grid";
import Time from "./time";
import Calendar from "./calendar";
import CommingEvents from "./comming_events";
import { Dashboard, BigText, Line, TopRow, Heading6 } from "../../styles";

export default function EventsComponent() {
    return (
        <MainGridComponent>
            <Dashboard>
                <TopRow>
                    <Heading6 color="#6DAA6C">
                        Today is:{" "}
                        {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
                    </Heading6>
                    <Time />
                </TopRow>
                <Line />
                <TopRow>
                    <BigText>Calendar:</BigText>
                </TopRow>
                <Line />
                <Calendar />
                <Line />
                <CommingEvents />
                <Line />
            </Dashboard>
        </MainGridComponent>
    );
}
