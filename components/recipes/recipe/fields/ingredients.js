import styled from "styled-components";
import {
    Field,
    IngredientField,
    PlainButton,
    AddButton,
} from "../../../../styles";
import { TiDeleteOutline } from "react-icons/ti";
import { RiAddCircleLine } from "react-icons/ri";

export default function Ingredients({
    ingredients,
    setIngredients,
    currentIngredient,
    setCurrentIngredient,
    errors,
}) {
    return (
        <Field>
            <label htmlFor="ingredients">Ingredients:</label>
            {ingredients.length > 0 && (
                <IngredientsList>
                    {ingredients.map((each, i) => {
                        return (
                            <li key={`ingr-${i}-${each}`}>
                                {each}
                                <PlainButton
                                    onClick={() =>
                                        setIngredients((prevState) =>
                                            prevState.filter((i) => i !== each)
                                        )
                                    }
                                >
                                    <TiDeleteOutline />
                                </PlainButton>
                            </li>
                        );
                    })}
                </IngredientsList>
            )}

            <IngredientField>
                <input
                    type="text"
                    name="ingredients"
                    id="ingredients"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            if (!currentIngredient) {
                                return;
                            }
                            setIngredients((prevState) => [
                                ...prevState,
                                currentIngredient,
                            ]);
                            setCurrentIngredient("");
                            e.preventDefault();
                        }
                    }}
                />
                <AddButton
                    type="button"
                    onClick={(e) => {
                        if (!currentIngredient) {
                            return;
                        }
                        setIngredients((prevState) => [
                            ...prevState,
                            currentIngredient,
                        ]);
                        setCurrentIngredient("");
                        e.preventDefault();
                    }}
                >
                    <RiAddCircleLine />
                    Add
                </AddButton>
            </IngredientField>

            {errors.field === "ingredients" ? (
                <small>{errors.message}</small>
            ) : null}
        </Field>
    );
}

const IngredientsList = styled.ul`
    padding: 1.4rem;
    margin: 0.9rem 0;
    background-color: ${(p) => p.theme.grey3};
    border-radius: 5px;
    list-style: none;

    li {
        margin: 0.9rem 0;
        color: ${(p) => p.theme.white};
        font-size: 1.2rem;
        font-family: "Courier New", sans-serif;
        border-bottom: 1px solid ${(p) => p.theme.grey2};
        display: flex;
        justify-content: space-between;
        align-itmes: center;

        svg {
            font-size: 1.4rem;
            color: orangered;
        }
    }
`;
