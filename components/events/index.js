import MainGridComponent from "../main_grid";
import Time from "./time";
import Calendar from "./calendar";
import CommingEvents from "./comming_events";
import { Dashboard, BigText, Line, TopRow } from "../../styles";

export default function EventsComponent() {
    return (
        <MainGridComponent>
            <Dashboard>
                <TopRow>
                    <BigText>Calendar:</BigText>
                    <Time />
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
