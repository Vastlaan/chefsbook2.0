import { DateTime } from "luxon";
import {
    Field,
    PlainButton,
    List,
    Note,
    RowNote,
    AddButton,
    IngredientField,
} from "../../../../styles";
import { TiDeleteOutline } from "react-icons/ti";
import { RiAddCircleLine, RiCalendarEventLine } from "react-icons/ri";

export default function Ingredients({
    items,
    setItems,
    currentItem,
    setCurrentItem,
    errors,
    dt,
}) {
    return (
        <Field>
            <label htmlFor="ingredients">Add item to the list:</label>

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
                <Note>
                    <RowNote>
                        <RiCalendarEventLine />{" "}
                        <p>
                            {DateTime.fromObject({
                                day: parseInt(dt.day),
                                month: parseInt(dt.month),
                                year: parseInt(dt.year),
                            }).toLocaleString(DateTime.DATE_FULL)}
                        </p>
                    </RowNote>
                    <List border>
                        {items.map((each, i) => {
                            return (
                                <RowNote key={`ingr-${i}-${each}`}>
                                    <p>{each}</p>
                                    <p>&nbsp;</p>
                                    <PlainButton
                                        type="button"
                                        onClick={() =>
                                            setItems((prevState) =>
                                                prevState.filter(
                                                    (i) => i !== each
                                                )
                                            )
                                        }
                                    >
                                        <TiDeleteOutline />
                                    </PlainButton>
                                </RowNote>
                            );
                        })}
                    </List>
                </Note>
            )}

            {errors.field === "ingredients" ? (
                <small>{errors.message}</small>
            ) : null}
        </Field>
    );
}
