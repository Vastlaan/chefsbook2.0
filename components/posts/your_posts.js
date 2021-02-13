import { useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Post from "./post";
import { respond, BigText, Line, ButtonPrimary, Text2 } from "../../styles";
import { RiAddLine } from "react-icons/ri";

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
                <Posts>
                    {user.posts &&
                        user.posts.map((post) => {
                            return (
                                <Post
                                    key={post.id}
                                    post={post}
                                    deletePost={deletePost}
                                />
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
const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${() => respond("m", "align-items: flex-start;")}
`;
