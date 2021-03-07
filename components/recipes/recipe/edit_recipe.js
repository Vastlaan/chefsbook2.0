import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
import Name from "./fields/name";
import Ingredients from "./fields/ingredients";
import Description from "./fields/description";
import Time from "./fields/time";
import Image from "./fields/image";
import { RiArrowGoBackLine } from "react-icons/ri";
import {
    Form1,
    Heading3,
    Field,
    ButtonPrimary,
    Options,
    GoBack,
} from "../../../styles";

export default function EditRecipeForm({ id }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [time, setTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (state.user.recipes.length === 0 || !state.user.recipes) {
            return router.push("/recipes");
        }
        const editableRecipe = state.user.recipes.find(
            (r) => Number(r.id) === Number(id)
        );
        console.log(editableRecipe);
        setTitle(editableRecipe.name);
        setDescription(editableRecipe.description);
        setTime(editableRecipe.time);
        setIngredients(JSON.parse(editableRecipe.ingredients));
        setPhotoUrl(editableRecipe.photo_url);
    }, []);

    function updateRecipe(e) {
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
        fileToSend.append("ingredients", JSON.stringify(ingredients));
        fileToSend.append("time", time);
        fileToSend.append("recipeId", id);
        if (file) {
            fileToSend.append("file", file);
        }
        fileToSend.append("photo_url", photoUrl);

        fetch("/api/recipes/updateRecipe", {
            method: "POST",
            body: fileToSend,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setErrors(data.error);
                    return console.error(data.error);
                }

                if (data.recipes) {
                    dispatch({ type: "updateRecipes", payload: data.recipes });
                    router.push("/recipes");
                }
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
        <MainGridComponent>
            <Form1 onSubmit={updateRecipe} onKeyDown={(e) => e.key != "Enter"}>
                <Heading3>Edit Recipe</Heading3>
                <Options>
                    <Link href={`/recipes/${id}`}>
                        <GoBack>
                            <RiArrowGoBackLine />
                        </GoBack>
                    </Link>
                </Options>
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
                    setErrors={setErrors}
                    photo_url={photoUrl}
                />

                <ButtonField>
                    {errors.field === "general" ? (
                        <small>{errors.message}</small>
                    ) : null}
                    <ButtonPrimary type="submit">Edit Recipe</ButtonPrimary>
                </ButtonField>
            </Form1>
        </MainGridComponent>
    );
}

const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;
