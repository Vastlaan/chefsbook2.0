import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Layout from "../globals/layout";
import Head from "../globals/head";
import Main from "../components/main_grid";
import { Heading3, Field, ButtonPrimary } from "../styles";
import { RiAddCircleLine } from "react-icons/ri";

export default function CreatePostComponent() {
    useEffect(() => {
        //logic to check if client is logged in
    }, []);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);

    function createPost(e) {
        e.preventDefault();
        const token = window.localStorage.getItem("chefsbookJWTToken");
        if (!token) {
            return console.log("Unable to send post");
        }

        const fileToSend = new FormData();
        fileToSend.append("file", file);
        fileToSend.append("title", title);
        fileToSend.append("text", text);

        fetch("/api/createPost", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: fileToSend,
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
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
                    </Field>
                    <Field>
                        <label htmlFor="text">Text</label>
                        <textarea
                            name="text"
                            id="text"
                            cols="10"
                            rows="10"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </Field>
                    <ImageField>
                        <label htmlFor="photo">
                            <RiAddCircleLine />
                            Add Photo
                        </label>
                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            onChange={(e) => {
                                setFileImage(
                                    URL.createObjectURL(e.target.files[0])
                                );
                                setFile(e.target.files[0]);
                            }}
                        />
                        <ImageBox>
                            {file ? (
                                <img src={fileImage} alt="image to upload" />
                            ) : (
                                <p>No photo added</p>
                            )}
                        </ImageBox>
                        {file ? <p>{file.name}</p> : null}
                    </ImageField>
                    <Field>
                        <ButtonPrimary type="submit">Submit</ButtonPrimary>
                    </Field>
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
`;
const ImageField = styled(Field)`
    // flex-direction: row;
    // justify-content: flex-start;
    // align-items: center;

    label {
        max-width: 25rem;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;

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
