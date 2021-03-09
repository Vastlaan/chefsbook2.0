import {
    AppSection,
    Column,
    Line,
    Icon,
    BigText,
    Text2,
    TopRow,
    SmallText,
    ButtonContainer,
    PlainButton,
    ImageContainerRound,
} from "../../../styles";
import { RiArrowRightLine } from "react-icons/ri";

export default function RecipesComponent({ recipes }) {
    const firstTwoRecipes = [];
    if (recipes.length > 0) {
        for (let i = 0; i < 2; i++) {
            if (recipes[i]) {
                firstTwoRecipes.push(recipes[i]);
            }
        }
    }
    console.log(firstTwoRecipes);

    return (
        <AppSection>
            <BigText>Recipes</BigText>
            <Line />
            {firstTwoRecipes.length > 0 ? (
                firstTwoRecipes.map((recipe, i) => {
                    return (
                        <Column key={`${recipe.id}-${i}`}>
                            <TopRow>
                                <ImageContainerRound
                                    dimension="1.9rem"
                                    margin="0 1.4rem 0 0"
                                >
                                    <img
                                        src={recipe.photo_url}
                                        alt={recipe.name}
                                    />
                                </ImageContainerRound>

                                <SmallText color="#BFC0C0">
                                    {recipe.name.substring(0, 20)}...
                                </SmallText>
                            </TopRow>
                            <Line />
                        </Column>
                    );
                })
            ) : (
                <Column>
                    <SmallText color="#BFC0C0" wide>
                        It seems you didn't create any recipe yet. Click to add
                        recipes to your book and manage them.
                    </SmallText>
                    <Line />
                </Column>
            )}
            <ButtonContainer>
                <PlainButton>
                    <Text2 color="#EF8354">Read more</Text2>
                    <Icon margin="0 0 0 1.4rem" color="#EF8354">
                        <RiArrowRightLine />
                    </Icon>
                </PlainButton>
            </ButtonContainer>
        </AppSection>
    );
}
