import MainGrid from "../../main_grid";
import Options from "./event_options";
import TopPanel from "./top_panel";
import EventsGrid from "./events_gird";
import { Dashboard, Line } from "../../../styles";

export default function EventDetails({ day, month, year, events }) {
    return (
        <MainGrid>
            <Dashboard>
                <TopPanel day={day} month={month} year={year} />
                <Line />
                <Options day={day} month={month} year={year} />
                <Line />
                <EventsGrid
                    day={day}
                    month={month}
                    year={year}
                    events={events}
                />
            </Dashboard>
        </MainGrid>
    );
}
