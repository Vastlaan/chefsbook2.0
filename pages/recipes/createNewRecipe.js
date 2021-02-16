import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import Main from "../../components/main_grid";
import { Context } from "../../store";
import checkIfAuthorized from "../../utils/checkIfAuthorized";
import {
    validateMimeType,
    validateTitle,
    validateText,
} from "../../validations";
import { Heading3, Field, ButtonPrimary, PlainButton } from "../../styles";
import { RiAddCircleLine } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";

export default function CreateRecipeComponent({ data }) {
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

    // check only once at page load if there is user already logged in and if not if an auth cookie with token exist (data) and load it to the state
    useEffect(() => {
        if (state.user.email) {
            return;
        }
        if (data.email) {
            dispatch({ type: "isLogged", payload: true });
            dispatch({ type: "setUser", payload: data });
        } else if (data.error && state.isLogged === "pending") {
            dispatch({ type: "isLogged", payload: false });
        }
    }, []);

    function createRecipe(e) {
        e.preventDefault();

        const isTitleValid = validateTitle(title);
        if (isTitleValid.type === "error") {
            return setErrors(isTitleValid);
        }

        const isTextValid = validateText(text);
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
        fileToSend.append("title", title);
        fileToSend.append("text", text);
        if (file) {
            fileToSend.append("file", file);
        }

        fetch("/api/recipes/createRecipe", {
            method: "POST",
            body: fileToSend,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setErrors(data.error);
                    return console.error(data.error);
                }
                if (data.post) {
                    dispatch({ type: "updateRecipes", payload: data.post });
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
        <Layout>
            <Head />
            <Main>
                <CreateRecipe
                    onSubmit={createRecipe}
                    onKeyDown={(e) => e.key != "Enter"}
                >
                    <Heading3>Create New Recipe</Heading3>
                    <Field>
                        <label htmlFor="title">Dish Name:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.field === "title" ? (
                            <small>{errors.message}</small>
                        ) : null}
                    </Field>
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
                                                    setIngredients(
                                                        (prevState) =>
                                                            prevState.filter(
                                                                (i) =>
                                                                    i !== each
                                                            )
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
                                onChange={(e) =>
                                    setCurrentIngredient(e.target.value)
                                }
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
                    <Field>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            id="description"
                            cols="10"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {errors.field === "description" ? (
                            <small>{errors.message}</small>
                        ) : null}
                    </Field>

                    <Field>
                        <label htmlFor="time">Preparation Time:</label>
                        <input
                            type="text"
                            name="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        {errors.field === "time" ? (
                            <small>{errors.message}</small>
                        ) : null}
                    </Field>
                    <ImageField>
                        <ImageBox>
                            {file ? (
                                <img src={fileImage} alt="image to upload" />
                            ) : (
                                <p>No photo added</p>
                            )}
                        </ImageBox>
                        <label htmlFor="photo">
                            <RiAddCircleLine />
                            Add Photo
                        </label>

                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            onChange={(e) => {
                                const result = validateMimeType(
                                    e.target.files[0]
                                );
                                if (result.type === "error") {
                                    return setErrors(result);
                                }
                                setFileImage(
                                    URL.createObjectURL(e.target.files[0])
                                );
                                setFile(e.target.files[0]);
                            }}
                        />
                    </ImageField>
                    {file ? <FileName>{file.name}</FileName> : null}
                    {errors.field === "file" ? (
                        <small>{errors.message}</small>
                    ) : null}

                    <ButtonField>
                        {errors.field === "general" ? (
                            <small>{errors.message}</small>
                        ) : null}
                        <ButtonPrimary type="submit">
                            Create Recipe
                        </ButtonPrimary>
                    </ButtonField>
                </CreateRecipe>
            </Main>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    try {
        const data = await checkIfAuthorized(ctx);
        return {
            props: {
                data,
            },
        };
    } catch (e) {
        return {
            props: {
                data: { error: e.toString() },
            },
        };
    }
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
const ImageField = styled(Field)`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0;

    label {
        max-width: 25rem;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        margin-left: 1.4rem;

        svg {
            margin-right: 1.4rem;
            font-size: 2.7rem;
        }

        &:hover {
            color: ${(p) => p.theme.grey3};
        }
    }

    input {
        padding: 0;
        margin: 0;
        height: 0;
        width: 0;
        opacity: 0;
        visibility: hidden;
    }
`;
const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    border-radius: 5px;
    border: 1px solid ${(p) => p.theme.grey1};
    overflow: hidden;

    img {
        width: 100%;
        object-fit: cover;
        object-position: center;
    }

    p {
        margin: 0.4rem;
        text-align: center;
        max-width: 100%;
        font-size: 1.4rem;
        color: ${(p) => p.theme.grey3};
    }
`;
const FileName = styled.p`
    font-size: 1.4rem;
    color: ${(p) => p.theme.grey3};
`;
const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;

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
