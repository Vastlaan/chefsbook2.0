import React from "react";
import styled from "styled-components";
import { Main } from "../../styles";
import Controlers from "../controlers";

export default function MainGridComponent({ children }) {
    return (
        <Main>
            <MainGrid>
                <Controlers />
                {children}
            </MainGrid>
        </Main>
    );
}

const MainGrid = styled.div`
    padding: 2.7rem;
    display: grid;
    grid-template-columns: minmax(30rem, 40rem) 1fr;
`;
