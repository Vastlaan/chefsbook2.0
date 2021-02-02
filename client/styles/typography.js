import { colors } from "./colors";
import { fonts } from "./fonts";
import styled from "styled-components";

export const Heading3 = styled.h3`
    font-size: 2.7rem;
    font-family: ${fonts.heading};
    font-weight: 900;
    text-transform: uppercase;
    color: ${(p) => (p.color ? p.color : colors.primaryDark)};
    max-width: 55rem;
`;
export const Text = styled.p`
    font-size: 1.9rem;
    color: ${(p) => (p.color ? p.color : colors.black)};
    max-width: 45rem;
`;
