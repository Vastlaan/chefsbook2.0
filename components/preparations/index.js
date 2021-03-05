import { useContext } from "react";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import {
    Dashboard,
    BigText,
    Line,
    TopRow,
    ButtonContainer,
    ButtonPrimary,
} from "../../styles";
import { RiAddLine } from "react-icons/ri";

export default function PreparationsComponent() {
    const { state, dispatch } = useContext(Context);
    console.log(state.user);
    return (
        <MainGridComponent>
            <Dashboard>
                <TopRow>
                    <BigText>Preparations:</BigText>
                </TopRow>
                <Line />
                <ButtonContainer>
                    <Link href="/preparations/createNewList">
                        <ButtonPrimary>
                            <RiAddLine />
                            Create New List
                        </ButtonPrimary>
                    </Link>
                </ButtonContainer>
                <Line />
            </Dashboard>
        </MainGridComponent>
    );
}
