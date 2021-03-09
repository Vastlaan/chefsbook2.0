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
    ButtonPrimary,
    FlexRow,
    GoBack,
    Text3,
} from "../../styles";
import { RiAddLine, RiArrowGoBackLine } from "react-icons/ri";

export default function PreparationsComponent() {
    const { state, dispatch } = useContext(Context);

    return (
        <MainGridComponent>
            <Dashboard>
                <TopRow>
                    <BigText>Preparations:</BigText>
                </TopRow>
                <Line />
                <TopRow>
                    <Link href="/">
                        <GoBack>
                            <RiArrowGoBackLine />
                        </GoBack>
                    </Link>
                    <Link href="/preparations/createNewList">
                        <ButtonPrimary>
                            <RiAddLine />
                            Create New List
                        </ButtonPrimary>
                    </Link>
                </TopRow>
                <Line />
                <FlexRow align="flex-start">
                    {state.user.preparations.length > 0 ? (
                        state.user.preparations.map((preparation) => {
                            return (
                                <Preparation
                                    key={preparation.id}
                                    details={preparation}
                                    members={state.user.members}
                                />
                            );
                        })
                    ) : (
                        <Text3 wide>
                            You haven't created any preparation list yet. Please
                            click the above button to Create New List.{" "}
                        </Text3>
                    )}
                </FlexRow>
            </Dashboard>
        </MainGridComponent>
    );
}
