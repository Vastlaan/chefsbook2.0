import { useContext } from "react";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Preparation from "./preparation";
import {
    Dashboard,
    BigText,
    Line,
    TopRow,
    ButtonContainer,
    ButtonPrimary,
    FlexRow,
} from "../../styles";
import { RiAddLine } from "react-icons/ri";

export default function PreparationsComponent() {
    const { state, dispatch } = useContext(Context);

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
                <FlexRow align="flex-start">
                    {state.user.preparations.map((preparation) => {
                        console.log(preparation);
                        return (
                            <Preparation
                                key={preparation.id}
                                details={preparation}
                                members={state.user.members}
                            />
                        );
                    })}
                </FlexRow>
            </Dashboard>
        </MainGridComponent>
    );
}
