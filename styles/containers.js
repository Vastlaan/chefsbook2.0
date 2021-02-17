import styled from "styled-components";
import { mixins } from "./mixins";
import respond from "./respond";

export const Main = styled.main`
    padding-top: ${mixins.padTopNav};
    background-image: ${(p) => `linear-gradient(
            to bottom,
            rgba(${p.theme.grey1RGB}, 1),
            rgba(${p.theme.grey1RGB}, 0.7)
        ),
        url(${p.url || "/img/landing-header-background.jpg"})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 80%;
    min-height: calc(100vh - 5rem);
    max-height: calc(100vh - 5rem);
    overflow: hidden;
`;
export const ContainerNarrow = styled.div`
    max-width: 1255px;
    margin: 0 auto;
`;
export const Grid = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding: 2.7rem 2.7rem;
    gap: 2.7rem;

    ${() =>
        respond(
            "m",
            `
            display: grid;
            grid-template-columns: 2fr 1fr;
            `
        )}
    ${() => respond("xxl", `padding: 6.7rem 2.7rem;`)}
`;

export const FlexCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > * {
        margin: 1.4rem 0;
    }

    ${() =>
        respond(
            "m",
            `
        & > * {
            margin: unset;
        }
    `
        )}
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    padding: 2.7rem 2.7rem;
    border-radius: 5px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    max-width: 50rem;
    min-width: 40rem;
`;
export const Login = styled.form`
    display: flex;
    flex-direction: column;
`;
export const Field = styled.div`
    max-width: 45rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.9rem;
    margin-top: ${(p) => (p.top ? p.top : "0")};

    label {
        color: ${(p) => p.theme.grey2};
        font-size: 1.9rem;
        margin-bottom: 0.9rem;
    }
    input,
    textarea {
        border: none;
        background-color: ${(p) => p.theme.white};
        padding: 0.9rem 1.4rem;
        font-size: 1.6rem;
        color: ${(p) => p.theme.black};
    }
    p {
        font-size: 1.4rem;
        color: ${(p) => p.theme.grey2};
    }
    small {
        font-size: 1rem;
        margin: 0.6rem 0;
        color: orangered;
    }
`;

export const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    border-radius: 5px;
    padding: 2.7rem;
    padding-bottom: 9rem;
    overflow: auto;

    ${() => respond("m", "padding-bottom: unset;")}
    small {
        font-size: 1rem;
        margin: 0.6rem 0;
        color: orangered;
    }
`;

export const ImageContainerSmall = styled.div`
    overflow: hidden;
    width: 100%;

    img {
        border-radius: 5px;
        width: 100%;
        object-position: center;
        object-fit: cover;
    }
`;
export const ImageContainerLarge = styled.div`
    overflow: hidden;
    width: 70%;
    margin: 0 auto;

    img {
        border-radius: 5px;
        width: 100%;
        object-position: center;
        object-fit: cover;
    }
`;
export const Options = styled.div`
    width: 100%;
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    small {
        color: ${(p) => p.theme.grey3} !important;
    }
`;
export const Option = styled.div`
    margin-right: 1.4rem;

    &:hover {
        position: relative;

        &::after {
            content: "delete";
            padding: 0.2rem 0.4rem;
            background-color: ${(p) => p.theme.grey1};
            position: absolute;
            bottom: 100%;
            left: 0;
            font-size: 0.9rem;
            color: ${(p) => p.theme.grey3};
        }
    }

    svg {
        font-size: 1.6rem;
        transition: all 0.3s;
    }
`;
export const Edit = styled(Option)`
    &:hover {
        &::after {
            content: "edit";
        }
    }
`;

export const Form1 = styled.form`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    border-radius: 5px;
    padding: 2.7rem;
    overflow: auto;

    small {
        font-size: 1rem;
        margin: 0.6rem 0;
        color: orangered;
    }
`;
