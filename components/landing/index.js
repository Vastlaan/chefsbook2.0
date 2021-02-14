import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import { Heading3 } from "../../styles";

export default function Landing() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    return (
        <MainGridComponent>
            <Dashboard>
                <Heading3>Here goes main content</Heading3>
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
