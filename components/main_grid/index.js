import React from "react";
import styled from "styled-components";
import { Main, ContainerNarrow } from "../../styles";
import Controlers from "../controlers";

export default function MainGridComponent({ children }) {
    return (
        <Main>
            <ContainerNarrow>
                <MainGrid>
                    <Controlers />
                    {children}
                </MainGrid>
            </ContainerNarrow>
        </Main>
    );
}

const MainGrid = styled.div`
    padding: 2.7rem;
    display: grid;
    grid-template-columns: minmax(25rem, 30rem) 1fr;
    grid-gap: 2.7rem;
`;
