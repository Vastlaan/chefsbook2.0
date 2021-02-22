import { useState, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Context } from "../../../store";
import Title from "./fields/title";
import Text from "./fields/text";
import Image from "./fields/image";
import {
    validateMimeType,
    validateTitle,
    validateText,
} from "../../../validations";
import { Form1, Heading3, Field, ButtonPrimary } from "../../../styles";

export default function CreateRecipeComponent() {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [errors, setErrors] = useState({});

    function createPost(e) {
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

        fetch("/api/posts/createPost", {
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
                    dispatch({ type: "updatePosts", payload: data.post });
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
        <Form1 onSubmit={createPost}>
            <Heading3>Create New Post</Heading3>

            <Title title={title} setTitle={setTitle} errors={errors} />

            <Text title={title} setText={setText} errors={errors} />

            <Image
                file={file}
                setFile={setFile}
                fileImage={fileImage}
                setFileImage={setFileImage}
                errors={errors}
                setErrors={setErrors}
            />

            <ButtonField>
                {errors.field === "general" ? (
                    <small>{errors.message}</small>
                ) : null}
                <ButtonPrimary type="submit">Submit</ButtonPrimary>
            </ButtonField>
        </Form1>
    );
}

const ButtonField = styled(Field)`
    margin-top: 1.4rem;
`;
