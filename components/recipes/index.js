import { useContext } from "react";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import {
    Dashboard,
    BigText,
    Line,
    ButtonPrimary,
    ButtonContainer,
} from "../../styles";
import Recipe from "./recipe/overview_recipe";
import { RiAddLine } from "react-icons/ri";

export default function YourRecipesComponent() {
    const {
        state: { user },
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
                <Line />

                {user.recipes &&
                    user.recipes.map((recipe, i) => {
                        return (
                            <Recipe
                                key={`recipe-${i}-${recipe.name}`}
                                recipe={recipe}
                            />
                        );
                    })}
            </Dashboard>
        </MainGridComponent>
    );
}
