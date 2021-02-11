import React from "react";
import styled from "styled-components";
import { Main, ContainerNarrow } from "../../styles";
import Controlers from "../controlers";

export default function MainGridComponent({ children }) {
    return (
        <Main>
            <Container>
                <MainGrid>
                    <Controlers />
                    {children}
                </MainGrid>
            </Container>
        </Main>
    );
}

const Container = styled(ContainerNarrow)`
    overflow: auto;
`;

const MainGrid = styled.div`
    padding: 2.7rem;
    display: grid;
    grid-template-columns: minmax(25rem, 30rem) 1fr;
    grid-gap: 2.7rem;
    overflow: auto;
`;
