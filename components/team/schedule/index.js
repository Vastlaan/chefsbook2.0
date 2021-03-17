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
                <Link href="/team/printSchedule">
                    <Print margin="0 1.4rem 0 auto">
                        <RiPrinterLine />
                    </Print>
                </Link>
            </TopRow>

            <Line />

            <TableGrid props={props} />
        </FlexCol>
    );
}
export default withTheme(ScheduleComponent);
