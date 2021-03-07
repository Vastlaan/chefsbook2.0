import { useState, useContext } from "react";
import { DateTime } from "luxon";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Context } from "../../../store";
import {
    validateMimeType,
    validateTitle,
    validateText,
    validateTime,
    validateIngredients,
} from "../../../validations";
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
    ButtonPrimary,
    Options,
    GoBack,
    Line,
} from "../../../styles";

export default function CreateNewListComponent() {
    const [dt, setDt] = useState(DateTime.now());

    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState("");

    const [errors, setErrors] = useState({});

    console.log(dt.day, "-", dt.month, "-", dt.year);

    return (
        <MainGridComponent>
            <Form1>
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
                />
            </Form1>
        </MainGridComponent>
    );
}
