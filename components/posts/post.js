import React from "react";
import {
    respond,
    Heading6,
    FlexCol,
    Text2,
    PlainButton,
    Line,
} from "../../styles";
import styled from "styled-components";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

export default function PostComponent({ post, deletePost }) {
    return (
        <Container>
            <Post withPhoto={post.photo_url ? true : false}>
                {post.photo_url ? (
                    <PostImage>
                        <img src={post.photo_url} alt="post main image" />
                    </PostImage>
                ) : null}
                <FlexCol>
                    <Heading6>{post.title}</Heading6>
                    <Text2>{post.text}</Text2>
                    <Options>
                        <PlainButton onClick={() => deletePost(post.id)}>
                            <Edit>
                                <RiEditLine />
                            </Edit>
                        </PlainButton>
                        <PlainButton onClick={() => deletePost(post.id)}>
                            <Option>
                                <RiDeleteBin2Line />
                            </Option>
                        </PlainButton>
                        <small>
                            created at: {post.created_at.split("T")[0]}
                        </small>
                    </Options>
                </FlexCol>
            </Post>

            <Line />
        </Container>
    );
}

const Container = styled.div``;
const Post = styled.div`
    border-radius: 5px;
    padding: 1.4rem;
    margin: 1.4rem 0;

    ${(p) =>
        respond(
            "m",
            `
            display: grid;
            grid-template-columns: ${
                p.withPhoto ? "minmax(15rem, 20rem) 1fr" : "1fr"
            };
            grid-gap: 2.7rem;
            `
        )}
`;
const PostImage = styled.div`
    overflow: hidden;
    border-radius: 5px;
    max-width: 20rem;
    max-height: 20rem;

    ${() => respond("m", `width: 100%; height: uset;`)}

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
        color: ${(p) => p.theme.grey3} !important;
    }
`;
const Option = styled.div`
    margin-right: 1.4rem;

    &:hover {
        position: relative;

        &::after {
            content: "delete";
            padding: 0.2rem 0.4rem;
            background-color: ${(p) => p.theme.grey1};
            position: absolute;
            bottom: 100%;
            left: 0;
            font-size: 0.9rem;
            color: ${(p) => p.theme.grey3};
        }
    }

    svg {
        font-size: 1.6rem;
        transition: all 0.3s;
    }
`;
const Edit = styled(Option)`
    &:hover {
        &::after {
            content: "edit";
        }
    }
`;
