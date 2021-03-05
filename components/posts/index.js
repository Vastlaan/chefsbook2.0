import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Post from "./post";
import {
    Dashboard,
    BigText,
    Line,
    ButtonPrimary,
    ButtonContainer,
    FlexCol,
} from "../../styles";
import { RiAddLine } from "react-icons/ri";

export default function YourPostsComponent() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    function deletePost(id, path) {
        fetch(`/api/posts/deletePost?id=${id}&path=${path}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return console.log(data.error);
                }
                dispatch({ type: "setPosts", payload: data.posts });
            })
            .catch((e) => console.error(e));
    }

    return (
        <MainGridComponent>
            <Dashboard>
                <BigText>My Posts:</BigText>
                <Line />
                <ButtonContainer>
                    <Link href="/posts/createPost">
                        <ButtonPrimary>
                            <RiAddLine />
                            Create New Post
                        </ButtonPrimary>
                    </Link>
                </ButtonContainer>
                <Line />
                <FlexCol alignItems="stretch">
                    {user.posts &&
                        user.posts.map((post) => {
                            return (
                                <Post
                                    key={post.id}
                                    post={post}
                                    deletePost={() =>
                                        deletePost(post.id, post.photo_url)
                                    }
                                />
                            );
                        })}
                </FlexCol>
            </Dashboard>
        </MainGridComponent>
    );
}
