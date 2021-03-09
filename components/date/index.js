import { DateTime } from "luxon";
import Time from "./time";
import { TopRow, Heading6 } from "../../styles";

export default function EventsComponent() {
    return (
        <TopRow>
            <Heading6 color="#6DAA6C">
                Today is: {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
            </Heading6>
            <Time />
        </TopRow>
    );
}
