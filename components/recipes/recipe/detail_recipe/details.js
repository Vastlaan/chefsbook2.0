import styled from "styled-components";
import {
    respond,
    ImageContainerSmall,
    FlexCol,
    Heading1,
    Heading3,
    Text3,
} from "../../../../styles";

export default function DetailsComponent({ recipe }) {
    return (
        <FlexCol>
            <Duo>
                {recipe.photo_url && (
                    <ImageContainerSmall>
                        <img src={recipe.photo_url} alt={recipe.name} />
                    </ImageContainerSmall>
                )}

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
        </FlexCol>
    );
}
const Duo = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 2.7rem;
    padding: 1.4rem 0;

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
