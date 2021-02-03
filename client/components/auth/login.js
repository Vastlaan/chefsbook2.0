import React from "react";
import styled, { withTheme } from "styled-components";
import { ButtonPrimary, ButtonSecondary, LinkButton, Line } from "../../styles";
import { FcGoogle } from "react-icons/fc";

function LoginComponent() {
    return (
        <Container>
            <Login>
                <Field>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e-mail"
                        autoComplete="username"
                    />
                </Field>
                <Field>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        autoComplete="current-password"
                    />
                </Field>
                <Field top="2.7rem">
                    <ButtonPrimary>Log in</ButtonPrimary>
                </Field>
                <Field>
                    <LinkButton href="/">Forgot the password?</LinkButton>
                </Field>
                <Field>
                    <p>or</p>
                </Field>
                <Field>
                    <ButtonGoogle color2="#1B1B1E">
                        <FcGoogle />
                        Sign in with Google
                    </ButtonGoogle>
                </Field>
                <Line />
                <Field>
                    <ButtonSecondary>Create Account</ButtonSecondary>
                </Field>
            </Login>
        </Container>
    );
}

export default withTheme(LoginComponent);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.black};
    padding: 2.7rem 2.7rem;
    border-radius: 5px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
`;
const Login = styled.form`
    display: flex;
    flex-direction: column;
`;
const Field = styled.div`
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
`;

const ButtonGoogle = styled(ButtonPrimary)`
    padding: 0.9rem 1.4rem;
    background-color: ${(p) => p.theme.white};
    font-size: 1.9rem;
    color: ${(p) => p.theme.black};
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        margin-right: 0.9rem;
        font-size: 2.2rem;
    }

    &:hover {
        color: ${(p) => (p.color2 ? p.color2 : p.theme.white)};
    }
`;
