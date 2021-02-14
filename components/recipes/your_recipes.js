import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import {
    respond,
    Dashboard,
    BigText,
    Line,
    ButtonPrimary,
    Text2,
} from "../../styles";
import { RiAddLine } from "react-icons/ri";

export default function YourRecipesComponent() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    return (
        <MainGridComponent>
            <Dashboard>
                <BigText>My Recipes:</BigText>
                <Line />
                <ButtonContainer>
                    <Link href="/recipes/createNewRecipe">
                        <ButtonPrimary>
                            <RiAddLine />
                            Create New Recipe
                        </ButtonPrimary>
                    </Link>
                </ButtonContainer>
                <div>here goes my recipes</div>
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
