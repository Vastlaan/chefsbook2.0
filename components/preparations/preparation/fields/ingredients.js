import styled from "styled-components";
import { Field, PlainButton } from "../../../../styles";
import { TiDeleteOutline } from "react-icons/ti";
import { RiAddCircleLine } from "react-icons/ri";

export default function Ingredients({
    items,
    setItems,
    currentItem,
    setCurrentItem,
    errors,
}) {
    return (
        <Field>
            <label htmlFor="ingredients">Ingredients:</label>

            <IngredientField>
                <input
                    type="text"
                    name="item"
                    id="item"
                    value={currentItem}
                    onChange={(e) => setCurrentItem(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            if (!currentItem) {
                                return;
                            }
                            setItems((prevState) => [
                                ...prevState,
                                currentItem,
                            ]);
                            setCurrentItem("");
                            e.preventDefault();
                        }
                    }}
                />
                <AddButton
                    onClick={(e) => {
                        if (!currentItem) {
                            return;
                        }
                        setItems((prevState) => [...prevState, currentItem]);
                        setCurrentItem("");
                        e.preventDefault();
                    }}
                >
                    <RiAddCircleLine />
                    Add
                </AddButton>
            </IngredientField>
            {items.length > 0 && (
                <IngredientsList>
                    {items.map((each, i) => {
                        return (
                            <li key={`ingr-${i}-${each}`}>
                                {each}
                                <PlainButton
                                    onClick={() =>
                                        setItems((prevState) =>
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

            {errors.field === "items" ? <small>{errors.message}</small> : null}
        </Field>
    );
}

const IngredientField = styled(Field)`
    flex-direction: row;
    justify-content: space-between;

    input {
        width: 25rem;
        max-width: 25rem;
    }
`;

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

const AddButton = styled(PlainButton)`
    color: ${(p) => p.theme.secondary};
    svg {
        font-size: 2.7rem;
        color: ${(p) => p.theme.secondary};
        margin-right: 0.9rem;
    }
`;
