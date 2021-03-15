import { useContext } from "react";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import {
    Dashboard,
    BigText,
    Line,
    ButtonPrimary,
    TopRow,
    GoBack,
    Text3,
} from "../../styles";
import Recipe from "./recipe/overview_recipe";
import { RiAddLine, RiArrowGoBackLine } from "react-icons/ri";

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
                <TopRow>
                    <Link href="/">
                        <GoBack>
                            <RiArrowGoBackLine />
                        </GoBack>
                    </Link>
                    <Link href="/recipes/createNewRecipe">
                        <ButtonPrimary>
                            <RiAddLine />
                            Create New Recipe
                        </ButtonPrimary>
                    </Link>
                </TopRow>
                <Line />

                {user.recipes.length > 0 ? (
                    user.recipes.map((recipe, i) => {
                        return (
                            <Recipe
                                key={`recipe-${i}-${recipe.name}`}
                                recipe={recipe}
                            />
                        );
                    })
                ) : (
                    <Text3 wide>
                        You haven't created any recipes yet. Please click the
                        above button to Create New Recipe.{" "}
                    </Text3>
                )}
            </Dashboard>
        </MainGridComponent>
    );
}
