import styled from "styled-components";
import { mixins } from "./mixins";

export const Header = styled.header`
    padding-top: ${mixins.padTopNav};
    background-image: ${(p) => `linear-gradient(
            to bottom,
            rgba(${p.theme.grey1RGB}, 1),
            rgba(${p.theme.grey1RGB}, 0.7)
        ),
        url(${p.url})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 80%;
    min-height: 90vh;
`;
export const ContainerNarrow = styled.div`
    max-width: 1255px;
    margin: 0 auto;
`;
export const Grid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 6.7rem 2.7rem;
    gap: 2.7rem;
`;

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    padding: 2.7rem 2.7rem;
    border-radius: 5px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
`;
export const Login = styled.form`
    display: flex;
    flex-direction: column;
`;
export const Field = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.9rem;
    margin-top: ${(p) => (p.top ? p.top : "0")};

    label {
        color: ${(p) => p.theme.grey2};
        font-size: 1.9rem;
        margin-bottom: 0.9rem;
    }
    input {
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
