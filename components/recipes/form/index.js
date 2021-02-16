import { useState, useContext } from "react";
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
//fields
import Name from "./fields/name";
import Ingredients from "./fields/ingredients";
import Description from "./fields/description";
import Time from "./fields/time";
import Image from "./fields/image";

import { Heading3, Field, ButtonPrimary } from "../../../styles";

export default function CreateRecipeForm() {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [time, setTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [errors, setErrors] = useState({});

    function createRecipe(e) {
        e.preventDefault();
        setErrors({});

        const isTitleValid = validateTitle(title);
        if (isTitleValid.type === "error") {
            return setErrors(isTitleValid);
        }
        const isTimeValid = validateTime(time);
        if (isTimeValid.type === "error") {
            return setErrors(isTimeValid);
        }
        const isIngredientsValid = validateIngredients(ingredients);
        if (isIngredientsValid.type === "error") {
            return setErrors(isIngredientsValid);
        }
        const isTextValid = validateText(description);
        if (isTextValid.type === "error") {
            return setErrors(isTextValid);
        }

        if (file) {
            const isMimeTypeValid = validateMimeType(file);
            if (isMimeTypeValid.type === "error") {
                return setErrors(isMimeTypeValid);
            }
        }

        const fileToSend = new FormData();
        fileToSend.append("name", title);
        fileToSend.append("description", description);
        fileToSend.append("ingredients", ingredients);
        fileToSend.append("time", time);
        if (file) {
            fileToSend.append("file", file);
        }

        fetch("/api/recipes/createRecipe", {
            method: "POST",
            body: fileToSend,
        })
            .then((res) => res.json())
            .then((data) => {
                // if (data.error) {
                //     setErrors(data.error);
                //     return console.error(data.error);
                // }
                console.log(data);
                // if (data.post) {
                //     dispatch({ type: "updateRecipes", payload: data.post });
                //     router.push("/recipes");
                // }
            })
            .catch((e) => {
                console.error(e);
                setErrors({
                    type: "error",
                    field: "general",
                    message: "Something went wrong",
                });
            });
    }
    return (
        <CreateRecipe
            onSubmit={createRecipe}
            onKeyDown={(e) => e.key != "Enter"}
        >
            <Heading3>Create New Recipe</Heading3>

            <Name title={title} setTitle={setTitle} errors={errors} />
            <Ingredients
                ingredients={ingredients}
                setIngredients={setIngredients}
                currentIngredient={currentIngredient}
                setCurrentIngredient={setCurrentIngredient}
                errors={errors}
            />
            <Description
                description={description}
                setDescription={setDescription}
                errors={errors}
            />
            <Time time={time} setTime={setTime} errors={errors} />
            <Image
                file={file}
                setFile={setFile}
                fileImage={fileImage}
                setFileImage={setFileImage}
                errors={errors}
            />

            <ButtonField>
                {errors.field === "general" ? (
                    <small>{errors.message}</small>
                ) : null}
                <ButtonPrimary type="submit">Create Recipe</ButtonPrimary>
            </ButtonField>
        </CreateRecipe>
    );
}

const CreateRecipe = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    border-radius: 5px;
    padding: 2.7rem;

    small {
        font-size: 1rem;
        margin: 0.6rem 0;
        color: orangered;
    }
`;

const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;
