import { useState, useContext } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { withTheme } from "styled-components";
import TableGrid from "./table";
import {
    FlexCol,
    TopRow,
    BigText,
    Line,
    GoBack,
    Print,
    PlainButton,
} from "../../../styles";
import { RiArrowGoBackLine, RiPrinterLine } from "react-icons/ri";

function ScheduleComponent(props) {
    const [dt, setDt] = useState(DateTime.now());

    async function printSchedule() {
        try {
            const res = await fetch("/api/pdf/printSchedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    day: dt.day,
                    month: dt.month,
                    year: dt.year,
                }),
            });

            const file = await res.blob();

            const fileURL = URL.createObjectURL(file);

            window.open(fileURL);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <FlexCol margin="0 0 1.4rem 0">
            <TopRow>
                <BigText>Team Schedule:</BigText>
            </TopRow>

            <Line />

            <TopRow width="100%">
                <Link href="/">
                    <GoBack>
                        <RiArrowGoBackLine />
                    </GoBack>
                </Link>
                <PlainButton onClick={printSchedule}>
                    <Print margin="0 1.4rem 0 auto">
                        <RiPrinterLine />
                    </Print>
                </PlainButton>
            </TopRow>

            <Line />

            <TableGrid props={props} dt={dt} setDt={setDt} />
        </FlexCol>
    );
}
export default withTheme(ScheduleComponent);
