import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Time from "./time";
import Calendar from "./calendar";
import {
    respond,
    Dashboard,
    BigText,
    Line,
    ButtonPrimary,
    FlexRow,
} from "../../styles";
import { RiAddLine } from "react-icons/ri";

export default function EventsComponent() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

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
                <BigText>Comming events:</BigText>
                <Line />
            </Dashboard>
        </MainGridComponent>
    );
}

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${() => respond("m", "align-items: flex-start;")}
`;
const TopRow = styled(FlexRow)`
    align-items: center;
    & > * {
        margin: 0;
    }
`;
