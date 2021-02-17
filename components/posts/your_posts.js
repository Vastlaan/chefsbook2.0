import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Post from "./post";
import {
    respond,
    Dashboard,
    BigText,
    Line,
    ButtonPrimary,
    Text2,
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
            .then((data) => dispatch({ type: "setPosts", payload: data.posts }))
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
                <Posts>
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
                </Posts>
            </Dashboard>
        </MainGridComponent>
    );
}

const Posts = styled.div`
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${() => respond("m", "align-items: flex-start;")}
`;
