import { fonts } from "./fonts";
import styled from "styled-components";

export const Heading1 = styled.h1`
    font-size: 3.3rem;
    font-family: ${fonts.heading};
    font-weight: 700;
    color: ${(p) => (p.color ? p.color : p.theme.primary)};
    max-width: 55rem;
    margin-bottom: 1.4rem;
`;

export const Heading3 = styled.h3`
    font-size: 2.7rem;
    font-family: ${fonts.heading};
    font-weight: 900;
    text-transform: uppercase;
    color: ${(p) => (p.color ? p.color : p.theme.primaryDark)};
    max-width: 55rem;
`;
export const Text = styled.p`
    font-size: 1.9rem;
    color: ${(p) => (p.color ? p.color : p.theme.grey3)};
    max-width: 45rem;
`;
