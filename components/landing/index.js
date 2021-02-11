import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import {
    FlexCol,
    Heading3,
    Heading6,
    Text2,
    Line,
    PlainButton,
} from "../../styles";

export default function Landing() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    function deletePost(id) {
        fetch(`/api/deletePost?id=${id}`)
            .then((res) => res.json())
            .then((data) => dispatch({ type: "setPosts", payload: data.posts }))
            .catch((e) => console.error(e));
    }

    return (
        <MainGridComponent>
            <Dashboard>
                <Heading3>Your Posts:</Heading3>
                <Posts>
                    {user.posts &&
                        user.posts.map((post) => {
                            return (
                                <div key={post.id}>
                                    <Post
                                        withPhoto={
                                            post.photo_url ? true : false
                                        }
                                    >
                                        {post.photo_url ? (
                                            <PostImage>
                                                <img
                                                    src={`https://michalantczak.ams3.digitaloceanspaces.com/${post.photo_url}`}
                                                    alt="post main image"
                                                />
                                            </PostImage>
                                        ) : null}
                                        <FlexCol>
                                            <Heading6>{post.title}</Heading6>
                                            <Text2>{post.text}</Text2>
                                            <Options>
                                                <PlainButton
                                                    onClick={() =>
                                                        deletePost(post.id)
                                                    }
                                                >
                                                    Delete post
                                                </PlainButton>
                                                <small>
                                                    created at:{" "}
                                                    {
                                                        post.created_at.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                </small>
                                            </Options>
                                        </FlexCol>
                                    </Post>

                                    <Line />
                                </div>
                            );
                        })}
                </Posts>
            </Dashboard>
        </MainGridComponent>
    );
}

const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    border-radius: 5px;
    padding: 2.7rem;
    overflow: auto;

    small {
        font-size: 1rem;
        margin: 0.6rem 0;
        color: orangered;
    }
`;
const Posts = styled.div`
    display: flex;
    flex-direction: column;
`;
const Post = styled.div`
    display: grid;
    grid-template-columns: ${(p) =>
        p.withPhoto ? "minmax(15rem, 20rem) 1fr" : "1fr"};
    grid-gap: 2.7rem;
    border-radius: 5px;
    padding: 1.4rem;
    margin: 1.4rem 0;
`;
const PostImage = styled.div`
    overflow: hidden;
    border-radius: 5px;
    width: 15rem;
    height: 15rem;

    img {
        width: 100%;
        object-position: center;
        object-fit: cover;
    }
`;
const Options = styled.div`
    width: 100%;
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    small {
        color: ${(p) => p.theme.grey3};
    }
`;
