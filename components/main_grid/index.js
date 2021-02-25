import React from "react";
import styled from "styled-components";
import { respond, Main, ContainerNarrow } from "../../styles";
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
    max-height: calc(100vh - 5rem);
`;

const MainGrid = styled.div`
    height: inherit;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    min-height: calc(100vh - 5rem);
    max-height: calc(100vh - 5rem);

    ${() =>
        respond(
            "m",
            `
            padding: 2.7rem;
            display: grid;
            grid-template-columns: minmax(25rem, 30rem) 1fr;
            grid-template-rows: 80vh;
            grid-gap: 2.7rem;
            `
        )}
`;
