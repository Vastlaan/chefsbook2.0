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

    console.log(user);

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
                <div>
                    {user.recipes &&
                        user.recipes.map((recipe, i) => {
                            return (
                                <ul key={`recipe-${i}-${recipe.name}`}>
                                    <li>{recipe.name}</li>
                                    <li>{recipe.description}</li>
                                    <li>{recipe.ingredients}</li>
                                </ul>
                            );
                        })}
                </div>
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
