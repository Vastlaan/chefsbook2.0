import { DateTime } from "luxon";
import Link from "next/link";
import MainGridComponent from "../main_grid";
import Time from "./time";
import Calendar from "./calendar";
import CommingEvents from "./comming_events";
import {
    Dashboard,
    BigText,
    Line,
    TopRow,
    Heading6,
    GoBack,
} from "../../styles";
import { RiArrowGoBackLine } from "react-icons/ri";

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
                    <Link href="/">
                        <GoBack>
                            <RiArrowGoBackLine />
                        </GoBack>
                    </Link>
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
