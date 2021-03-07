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
    max-height: 100vh;
    overflow: auto;
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
    align-items: ${(p) => (p.alignItems ? p.alignItems : "flex-start")};

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
export const FlexRow = styled.div`
    display: flex;
    align-items: ${(p) => (p.align ? p.align : "center")};
    justify-content: ${(p) => (p.justify ? p.justify : "flex-start")};
    flex-wrap: wrap;

    & > * {
        margin: 1.4rem 0;
    }
    svg {
        margin-right: 1.4rem;
    }
`;
export const TopRow = styled.div`
    display: flex;
    align-items: center;
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
    flex-direction: ${(p) => (p.direction ? p.direction : "column")};
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
        color: ${(p) => p.theme.grey3};
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
    span {
        color: ${(p) => p.theme.secondary};
    }
`;

export const Dashboard = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    border-radius: 5px;
    padding: 2.7rem 1.4rem;
    padding-bottom: 9rem;
    overflow: auto;
    ${() => respond("s", "padding: 2.7rem;")}
    ${() => respond("m", "padding-bottom: 4.7rem;")}
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
export const ImageContainerRound = styled.div`
    overflow: hidden;
    width: ${(p) => (p.dimension ? p.dimension : "15rem")};
    height: ${(p) => (p.dimension ? p.dimension : "15rem")};
    border-radius: 50%;
    border: 1px solid ${(p) => p.theme.grey3};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${(p) => (p.margin ? p.marign : "1.4rem 0")};

    img {
        width: 100%;
        object-position: center;
        object-fit: cover;
    }
    label {
        margin: 0;
        color: ${(p) => p.theme.grey3};
    }
`;
export const Options = styled.div`
    width: 100%;
    margin-top: ${(p) => (p.marginTop ? p.marginTop : "auto")};
    display: flex;
    justify-content: ${(p) =>
        p.justifyContent ? p.justifyContent : "flex-end"};
    align-items: ${(p) => (p.alignItems ? p.alignItems : "center")};

    small {
        color: ${(p) => p.theme.grey3} !important;
    }
`;
export const Option = styled.div`
    margin: 0 1.4rem;

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
        font-size: 1.9rem;
        transition: all 0.3s;
        color: ;
    }
`;
export const Edit = styled(Option)`
    &:hover {
        &::after {
            content: "edit";
        }
    }
`;
export const GoBack = styled(Option)`
    margin: 0;
    margin-right: auto;
    color: ${(p) => p.theme.primary};
    transition: all 0.3s;

    &:hover {
        cursor: pointer;
        color: ${(p) => p.theme.primaryDark};
        &::after {
            content: "back";
        }
    }
`;
export const SendEmail = styled(Option)`
    svg {
        color: ${(p) => p.theme.white};
    }
    &:hover {
        cursor: pointer;
        color: ${(p) => p.theme.primaryDark};
        &::after {
            content: "send as email";
        }
    }
`;

export const Form1 = styled.form`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    border-radius: 5px;
    padding: 2.7rem 1.4rem;
    overflow: auto;
    padding-bottom: 9rem;

    ${() => respond("s", "padding: 2.7rem;")}
    ${() => respond("m", "padding-bottom: unset;")}

    small {
        font-size: 1rem;
        letter-spacing: 0.15rem;
        margin: 0.6rem 0;
        color: orangered;
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    ${() => respond("m", "align-items: flex-start;")}
`;
export const TableRow = styled.div`
    padding: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(p) => (p.color ? p.color : p.theme.primary)};
    background-color: ${(p) =>
        p.disabled ? p.theme.grey3 : p.fill ? p.color : "transparent"};
    pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
    transition: all 0.3s;

    ${() => respond("l", "padding: 0.7rem")}

    &:hover {
        cursor: ${(p) => (p.hovered ? "pointer" : "arrow")};
        background-color: ${(p) => p.hovered && p.color};
        p {
            color: ${(p) => p.hovered && p.theme.white};
        }
    }

    p {
        flex: 1;
        color: ${(p) =>
            p.colorFont ? p.colorFont : p.color ? p.color : p.theme.primary};
        font-size: 1.6rem;
        text-align: center;
        letter-spacing: 0.15rem;

        ${() => respond("s", "font-size: 1.6rem")}
    }

    svg {
        margin: 0 0.7rem;
        font-size: 2.7rem;

        &:hover {
            fill: ${(p) => p.theme.grey2};
        }
    }
`;

export const WeekdaysPanel = styled.div`
    display: flex;
    width: 100%;
`;
export const WeekdayPanelRow = styled(TableRow)`
    flex: 1;
    diplay: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.7rem 0;
    min-width: 5rem;

    ${() => respond("l", "padding: 0.7rem")}
    p {
        display: flex;
        flex-direction: column;
        font-size: 1.4rem;
    }
    sup {
        color: ${(p) => p.theme.primaryDark};
    }
`;
export const TableGrid = styled.div`
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    width: fill-available;
    margin: 2.7rem 0rem;
    display: grid;
    grid-template-columns: minmax(15rem, 15rem) minmax(19rem, 1fr);
    overflow: auto;

    ${() =>
        respond(
            "s",
            `
            grid-template-columns: minmax(15rem, 18rem) minmax(19rem, 1fr);
            `
        )}

    ${() =>
        respond(
            "l",
            `
              grid-template-columns: minmax(15rem, 25rem) minmax(25rem, 1fr);
              margin: 2.7rem 1.4rem;
            `
        )}
`;

export const Note = styled.div`
    min-width: 35rem;
    padding: 1.4rem;
    margin: 1.4rem;
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.secondary};
    border-radius: 5px;
    transition: all 0.3s;
    position: relative;
`;
export const RowNote = styled.div`
    display: flex;
    align-items: center;

    p {
        color: ${(p) => p.theme.white};
        font-size: 1.9rem;
    }
    svg {
        color: ${(p) => p.theme.white};
        font-size: 1.9rem;
        margin-right: 1.4rem;
    }
`;
export const List = styled.ul`
    border-top: ${(p) => (p.border ? `1px solid ${p.theme.white}` : "none")};
    padding: 1.4rem 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    li {
        font-size: 1.9rem;
        color: ${(p) => p.theme.white};
    }
`;

export const ListSmall = styled(List)`
    border: 1px solid ${(p) => p.theme.white};
    padding: 0.7rem;
    transition: all 0.3s;

    p {
        color: ${(p) => p.theme.white};
    }

    li {
        font-size: 1.4rem;
        color: ${(p) => p.theme.white};
        transition: all 0.3s;

        &:hover {
            cursor: pointer;
            color: ${(p) => p.theme.grey2};
        }
    }
`;
export const CustomSelect = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        font-size: 1.4rem;
        color: ${(p) => (p.disabled ? p.theme.grey3 : p.theme.secondary)};
    }

    select {
        margin: 0 0.3rem;
        border: 1px solid
            ${(p) => (p.disabled ? p.theme.grey3 : p.theme.secondary)};
        border-radius: 5px;
        background-color: transparent;
        padding: 0.3rem 0.7rem;
        color: ${(p) => (p.disabled ? p.theme.grey3 : p.theme.secondary)};
        font-size: 1.4rem;
        pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

        &:active,
        :focus {
            outline: none;
        }

        option {
            font-size: 1.4rem;
            color: ${(p) => p.theme.secondary};
        }
    }
`;
