import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../../globals/layout";
import Head from "../../../globals/head";
import Main from "../../../components/main_grid";
import { Context } from "../../../store";
import checkIfAuthorized from "../../../utils/checkIfAuthorized";
import {
    validateMimeType,
    validateTitle,
    validateText,
} from "../../../validations";
import { Form1, Heading3, Field, ButtonPrimary } from "../../../styles";
import { RiAddCircleLine } from "react-icons/ri";

export default function CreatePostComponent({ data, id }) {
    const router = useRouter();

    if (!id) {
        return router.push("/posts");
    }
    const { state, dispatch } = useContext(Context);

    const [postId, setPostId] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [errors, setErrors] = useState({});

    const editablePost = data.posts.find((p) => Number(p.id) === Number(id));

    // check only once at page load if there is user already logged in and if not if an auth cookie with token exist (data) and load it to the state
    useEffect(() => {
        setTitle(editablePost.title);
        setText(editablePost.text);
        setPostId(editablePost.id);
        setPhotoUrl(editablePost.photo_url);

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

    function editPost(e) {
        e.preventDefault();
        setErrors({});

        const isTitleValid = validateTitle(title);
        if (isTitleValid.type === "error") {
            return setErrors(isTitleValid);
        }

        const isTextValid = validateText(text);
        if (isTextValid.type === "error") {
            return setErrors(isTextValid);
        }

        const fileToSend = new FormData();

        if (file) {
            const isMimeTypeValid = validateMimeType(file);
            if (isMimeTypeValid.type === "error") {
                return setErrors(isMimeTypeValid);
            }
            fileToSend.append("file", file);
        }
        fileToSend.append("postId", postId);
        fileToSend.append("title", title);
        fileToSend.append("text", text);
        fileToSend.append("photo_url", photoUrl);

        fetch("/api/posts/updatePost", {
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
                    dispatch({ type: "updateSinglePost", payload: data.post });
                    router.push("/posts");
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
                <Form1 onSubmit={editPost}>
                    <Heading3>Edit Post</Heading3>
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
                            ) : editablePost.photo_url !== "" ? (
                                <img
                                    src={editablePost.photo_url}
                                    alt="image to upload"
                                />
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
                        <ButtonPrimary type="submit">Submit</ButtonPrimary>
                    </ButtonField>
                </Form1>
            </Main>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    try {
        const data = await checkIfAuthorized(ctx);
        return {
            props: {
                data,
                id,
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
