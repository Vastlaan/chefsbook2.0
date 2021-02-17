import styled from "styled-components";
import {
    respond,
    Line,
    Options,
    Option,
    ImageContainerSmall,
    Edit,
    Text3,
    Heading6,
    FlexCol,
    PlainButton,
    ButtonSecondary,
} from "../../styles";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

export default function RecipeComponent({ recipe }) {
    return (
        <>
            <Recipe withPhoto={recipe.photo_url ? true : false}>
                {recipe.photo_url ? (
                    <ImageContainerSmall>
                        <img src={recipe.photo_url} alt="post main image" />
                    </ImageContainerSmall>
                ) : null}
                <FlexCol>
                    <Heading6>{recipe.name}</Heading6>
                    <br />
                    <Text3>{`${recipe.description.substring(
                        0,
                        100
                    )} . . .`}</Text3>
                    <br />
                    <ButtonSecondary>View details</ButtonSecondary>
                    {/* <Options>
                        <PlainButton onClick={() => editRecipe(recipe.id)}>
                            <Edit>
                                <RiEditLine />
                            </Edit>
                        </PlainButton>
                        <PlainButton onClick={() => deleteRecipe(recipe.id)}>
                            <Option>
                                <RiDeleteBin2Line />
                            </Option>
                        </PlainButton>
                        <small>
                            created at: {recipe.created_at.split("T")[0]}
                        </small>
                    </Options> */}
                </FlexCol>
            </Recipe>

            <Line />
        </>
    );
}

const Recipe = styled.div`
    border-radius: 5px;
    padding: 1.4rem;
    margin: 1.4rem 0;

    ${(p) =>
        respond(
            "s",
            `
            display: grid;
            grid-template-columns: ${
                p.withPhoto ? "minmax(15rem, 20rem) 1fr" : "1fr"
            };
            grid-gap: 2.7rem;
            `
        )}
`;

const Ingredients = styled.div`
    margin: 1.4rem auto;
    display: flex;
    justify-content: space-around;
`;
