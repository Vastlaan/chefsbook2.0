import styled from "styled-components";

export const ButtonPrimary = styled.button`
    padding: 0.9rem 2.2rem;
    background-color: ${(p) => p.theme.primary};
    position: relative;
    z-index: 2;
    font-size: 1.9rem;
    color: ${(p) => p.theme.white};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        margin-right: 1.4rem;
        font-size: 2.2rem;
    }

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${(p) => p.theme.secondary};
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
    padding: 0.9rem 2.2rem;
    background-color: ${(p) => p.theme.secondary};
    position: relative;
    z-index: 2;
    font-size: 1.9rem;
    color: ${(p) => p.theme.white};
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${(p) => p.theme.primary};
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
    color: ${(p) => (p.color ? p.color : p.theme.grey2)};
    text-decoration: underline;
    transition: all 0.3s;

    svg {
        margin: 0 0.9rem;
    }

    &:hover {
        color: ${(p) => p.theme.secondary};
    }
`;

export const PlainButton = styled.button`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        svg {
            color: ${(p) => p.theme.primaryDark};
        }
    }

    svg {
        font-size: 2.2rem;
        color: ${(p) => p.theme.primary};
        transition: all 0.3s;
    }
`;
export const InputFlexible = styled.input`
    margin: 0 !important;
    border: none;
    background-color: transparent !important;
    color: ${(p) => p.theme.secondary} !important;

    &:focus,
    :active {
        box-shadow: none;
    }
`;
export const DeleteNote = styled(PlainButton)`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.7rem;

    svg {
        color: ${(p) => p.theme.white};
    }
`;

export const AddButton = styled(PlainButton)`
    color: ${(p) => p.theme.secondary};
    svg {
        font-size: 2.7rem;
        color: ${(p) => p.theme.secondary};
        margin-right: 0.9rem;
    }
`;
