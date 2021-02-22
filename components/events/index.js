import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Calendar from "./calendar";
import { respond, Dashboard, BigText, Line, ButtonPrimary } from "../../styles";
import { RiAddLine } from "react-icons/ri";

export default function EventsComponent() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    return (
        <MainGridComponent>
            <Dashboard>
                <BigText>Calendar:</BigText>
                <Line />
                <ButtonContainer>
                    <Link href="/posts/createPost">
                        <ButtonPrimary>
                            <RiAddLine />
                            Create New Event
                        </ButtonPrimary>
                    </Link>
                </ButtonContainer>
                <Line />
                <Calendar />
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
