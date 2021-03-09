import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { respond, fonts } from "../../styles";
import ThemeControler from "./theme_controler";
import UserControlers from "./user_controlers";

export default function Navigation() {
    return (
        <Container>
            <Name>
                <Link href="/">Chefsbook.org</Link>
            </Name>
            <Controlers>
                <ThemeControler />
                <UserControlers />
            </Controlers>
        </Container>
    );
}

const Container = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.9rem;
    background-color: ${(p) => p.theme.blackAlways};
    display: flex;

    ${() => respond("m", "padding: 0.9rem 2.7rem;")}
`;
const Name = styled.h1`
    font-family: ${fonts.heading};
    color: ${(p) => p.theme.primary};
    font-size: 2.2rem;
    font-weight: 500;
`;
const Controlers = styled.div`
    margin: 0 0 0 auto;
    display: flex;
    align-items: center;
`;
