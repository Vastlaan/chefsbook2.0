import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import styled from "styled-components";
import {
    respond,
    Dashboard,
    BigText,
    ButtonPrimary,
    Line,
    Options,
    Option,
    ImageContainerSmall,
    Edit,
    Text3,
    Heading1,
    Heading3,
    FlexCol,
    PlainButton,
    ButtonSecondary,
} from "../../styles";
import {
    RiDeleteBin2Line,
    RiEditLine,
    RiArrowGoBackLine,
} from "react-icons/ri";

export default function DetailRecipeComponent({ recipe }) {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    function deleteRecipe(id, path) {
        fetch(`/api/recipes/deleteRecipe?id=${id}&path=${path}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: "setRecipes", payload: data.recipes });
                return router.push("/recipes");
            })
            .catch((e) => console.error(e));
    }

    return (
        <MainGridComponent>
            <Dashboard>
                <Options marginTop="unset">
                    <Link href="/recipes">
                        <GoBack>
                            <RiArrowGoBackLine />
                        </GoBack>
                    </Link>

                    <PlainButton>
                        <Link href={`/recipes/edit/${recipe.id}`}>
                            <Edit>
                                <RiEditLine />
                            </Edit>
                        </Link>
                    </PlainButton>
                    <PlainButton onClick={() => deleteRecipe(recipe.id)}>
                        <Option>
                            <RiDeleteBin2Line />
                        </Option>
                    </PlainButton>
                    <small>created at: {recipe.created_at.split("T")[0]}</small>
                </Options>
                <Heading1>{recipe.name}</Heading1>
                <Duo>
                    <ImageContainerSmall>
                        <img src={recipe.photo_url} alt={recipe.name} />
                    </ImageContainerSmall>
                    <Ingredients>
                        <Heading3>Ingredients:</Heading3>
                        {JSON.parse(recipe.ingredients).map((ingredient, i) => (
                            <li key={`${ingredient}-${i}`}>{ingredient}</li>
                        ))}
                        <PrepTime>
                            Estimated preparation time: {recipe.time}
                        </PrepTime>
                    </Ingredients>
                </Duo>
                <div>
                    <Heading3>Preparation:</Heading3>
                    <WideText>{recipe.description}</WideText>
                </div>
            </Dashboard>
        </MainGridComponent>
    );
}
const Duo = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2.7rem;

    ${() => respond("m", "grid-template-columns: 1fr 1fr;")}
`;
const Ingredients = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;

    li {
        margin: 0.7rem 0;
        font-size: 1.9rem;
        font-style: italic;
        font-weight: 300;
        color: ${(p) => p.theme.grey2};
    }
`;
const PrepTime = styled.li`
    margin-top: auto;
    color: ${(p) => p.theme.primary} !important;
`;
const WideText = styled(Text3)`
    max-width: 100%;
    margin-bottom: 2.7rem;
`;
const GoBack = styled(Option)`
    margin-right: auto;
    color: ${(p) => p.theme.primary};
    transition: all 0.3s;

    &:hover {
        cursor: pointer;
        color: ${(p) => p.theme.primaryDark};
        &::after {
            content: "back";
        }
    }
`;
