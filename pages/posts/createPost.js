import { useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../globals/layout";
import Head from "../../globals/head";
import Main from "../../components/main_grid";
import { Context } from "../../store";
import {
    validateMimeType,
    validateTitle,
    validateText,
} from "../../validations";
import { Heading3, Field, ButtonPrimary } from "../../styles";
import { RiAddCircleLine } from "react-icons/ri";

export default function CreatePostComponent() {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [errors, setErrors] = useState({});

    function createPost(e) {
        e.preventDefault();

        const isTitleValid = validateTitle(title);
        if (isTitleValid.type === "error") {
            return setErrors(isTitleValid);
        }

        const isTextValid = validateText(text);
        if (isTextValid.type === "error") {
            return setErrors(isTextValid);
        }

        const fileToSend = new FormData();
        fileToSend.append("title", title);
        fileToSend.append("text", text);
        if (file) {
            fileToSend.append("file", file);
        }

        fetch("/api/createPost", {
            method: "POST",
            body: fileToSend,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return console.error(data.error);
                }
                if (data.post) {
                    dispatch({ type: "updatePosts", payload: data.post });
                    router.push("/posts");
                }
            })
            .catch((e) => console.log(e));
    }

    return (
        <Layout>
            <Head />
            <Main>
                <CreatePost onSubmit={createPost}>
                    <Heading3>Create New Post</Heading3>
                    <Field>
                        <label htmlFor="title">Title</label>
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
                        <label htmlFor="text">Text</label>
                        <textarea
                            name="text"
                            id="text"
                            cols="10"
                            rows="5"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        {errors.field === "text" ? (
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
                        <ButtonPrimary type="submit">Submit</ButtonPrimary>
                    </ButtonField>
                </CreatePost>
            </Main>
        </Layout>
    );
}

const CreatePost = styled.form`
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
