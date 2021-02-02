import styled from "styled-components";
import { colors } from "./colors";

export const ButtonPrimary = styled.button`
    padding: 0.9rem 1.4rem;
    background-color: ${colors.primary};
    position: relative;
    z-index: 2;
    font-size: 1.9rem;
    color: ${colors.white};
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${colors.secondary};
        border-radius: 5px;
        z-index: -1;
        transition: all 0.3s;
    }
    &:hover {
        &::after {
            top: 0;
        }
    }
`;
export const ButtonSecondary = styled.button`
    padding: 0.9rem 1.4rem;
    background-color: ${colors.secondary};
    position: relative;
    z-index: 2;
    font-size: 1.9rem;
    color: ${colors.white};
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${colors.primary};
        border-radius: 5px;
        z-index: -1;
        transition: all 0.3s;
    }
    &:hover {
        &::after {
            top: 0;
        }
    }
`;

export const LinkButton = styled.a`
    font-size: 1.6rem;
    color: ${(p) => (p.color ? p.color : colors.grey2)};
    text-decoration: underline;
    transition: all 0.3s;

    svg {
        margin: 0 0.9rem;
    }

    &:hover {
        color: ${colors.secondary};
    }
`;
