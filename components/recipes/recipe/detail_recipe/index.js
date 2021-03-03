import { useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../../../store";
import MainGridComponent from "../../../main_grid";
import Details from "./details";
import Options from "./options";
import { Dashboard, Heading1, Line } from "../../../../styles";

export default function DetailRecipeComponent({ recipe }) {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    return (
        <MainGridComponent>
            <Dashboard>
                <Heading1>{recipe.name}</Heading1>
                <Line />
                <Options recipe={recipe} />
                <Line />
                <Details recipe={recipe} />
            </Dashboard>
        </MainGridComponent>
    );
}
