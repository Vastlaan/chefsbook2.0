import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../../styles";

export default function Navigation() {
    return (
        <Container>
            <Name>Chefsbook.org</Name>
        </Container>
    );
}

const Container = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.9rem 2.7rem;
    background-color: ${colors.black};
    display: flex;
`;
const Name = styled.h1`
    font-family: ${fonts.heading};
    color: ${colors.primary};
    font-size: 2.2rem;
    font-weight: 500;
`;
