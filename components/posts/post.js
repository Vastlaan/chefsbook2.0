import Link from "next/link";
import {
    respond,
    Heading6,
    FlexCol,
    Text3,
    PlainButton,
    Line,
    Options,
    Option,
    Edit,
    ImageContainerSmall,
} from "../../styles";
import styled from "styled-components";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

export default function PostComponent({ post, deletePost }) {
    return (
        <Container>
            <Post withPhoto={post.photo_url ? true : false}>
                {post.photo_url ? (
                    <ImageContainerSmall>
                        <img src={post.photo_url} alt="post main image" />
                    </ImageContainerSmall>
                ) : null}
                <FlexCol>
                    <Heading6>{post.title}</Heading6>
                    <br />
                    <Text3>{post.text}</Text3>
                    <Options>
                        <Link href={`/posts/edit/${post.id}`}>
                            <PlainButton>
                                <Edit>
                                    <RiEditLine />
                                </Edit>
                            </PlainButton>
                        </Link>
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
            "s",
            `
            display: grid;
            grid-template-columns: ${
                p.withPhoto ? "minmax(15rem, 20rem) 1fr" : "1fr"
            };
            grid-gap: 2.7rem;
            `
        )}
`;
