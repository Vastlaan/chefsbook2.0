import { useState, useContext } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../../../store";
import { validateIngredients } from "../../../validations";
import MainGridComponent from "../../main_grid";
//fields
import Day from "./fields/day";
import Month from "./fields/month";
import Year from "./fields/year";
import Ingredients from "./fields/ingredients";

import { RiArrowGoBackLine } from "react-icons/ri";
import {
    Form1,
    Heading3,
    Heading6,
    FlexRow,
    ButtonContainer,
    ButtonPrimary,
    Options,
    GoBack,
    Line,
    Text2,
} from "../../../styles";

export default function CreateNewListComponent() {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const [dt, setDt] = useState(DateTime.now().plus({ day: 1 }));

    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState("");

    const [errors, setErrors] = useState({});

    async function createList(e) {
        e.preventDefault();

        const isListValid = validateIngredients(items);
        if (isListValid.type === "error") {
            return setErrors(isListValid);
        }
        if (!dt) {
            return router.push("/preparations");
        }

        const dataToSend = {
            day: dt.day,
            month: dt.month,
            year: dt.year,
            list: JSON.stringify(items),
        };

        try {
            const res = await fetch("/api/preparations/createList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await res.json();
            if (data.error) {
                console.error(data.error);
                return setErrors({
                    type: "error",
                    field: "items",
                    message: "Something went wrong",
                });
            }
            dispatch({
                type: "updatePreparations",
                payload: data.preparations,
            });
            return router.push("/preparations");
        } catch (e) {
            console.error(e);
            return setErrors({
                type: "error",
                field: "items",
                message: "Something went wrong",
            });
        }
    }

    return (
        <MainGridComponent>
            <Form1 onSubmit={createList}>
                <Heading3>Create New List</Heading3>
                <Line />
                <Options marginTop="0">
                    <Link href="/preparations">
                        <GoBack>
                            <RiArrowGoBackLine />
                        </GoBack>
                    </Link>
                    <Heading6 color="#6DAA6C">
                        {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
                    </Heading6>
                </Options>
                <Line />
                <Text2>Choose the date:</Text2>
                <br />
                <FlexRow>
                    <Day dt={dt} setDt={setDt} />
                    <Month dt={dt} setDt={setDt} />
                    <Year dt={dt} setDt={setDt} />
                </FlexRow>

                <Ingredients
                    items={items}
                    setItems={setItems}
                    currentItem={currentItem}
                    setCurrentItem={setCurrentItem}
                    errors={errors}
                    dt={dt}
                />
                {errors.field === "general" && <small>{errors.message}</small>}
                <ButtonContainer>
                    <ButtonPrimary type="submit">Save List</ButtonPrimary>
                </ButtonContainer>
            </Form1>
        </MainGridComponent>
    );
}
