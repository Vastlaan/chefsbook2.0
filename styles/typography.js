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
export const Heading6 = styled.h6`
    font-size: 1.9rem;
    font-family: ${fonts.heading};
    font-weight: 800;
    color: ${(p) => (p.color ? p.color : p.theme.primary)};
    max-width: 55rem;
`;
export const Text = styled.p`
    font-size: 1.9rem;
    color: ${(p) => (p.color ? p.color : p.theme.grey3)};
    max-width: 45rem;
`;
export const Text2 = styled.p`
    font-size: 1.9rem;
    color: ${(p) => (p.color ? p.color : p.theme.grey2)};
    max-width: 45rem;
    text-align: ${(p) => (p.align ? p.align : "left")};

    span {
        color: ${(p) => p.theme.secondary};
    }
`;
export const Text3 = styled.p`
    font-size: 1.9rem;
    color: ${(p) => (p.color ? p.color : p.theme.grey2)};
    max-width: 45rem;
    white-space: break-spaces;
`;
export const BigText = styled.p`
    font-size: 2.2rem;
    color: ${(p) => (p.color ? p.color : p.theme.primary)};
    max-width: 45rem;
    cursor: ${(p) => (p.cursor ? p.cursor : "arrow")};
    span {
        color: ${(p) => p.theme.secondary};
    }
`;
export const SmallText = styled.p`
    font-size: 1.4rem;
    color: ${(p) => (p.color ? p.color : p.theme.grey3)};
    max-width: 45rem;
`;
