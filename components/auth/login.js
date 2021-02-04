import React from "react";
import Link from "next/link";
import styled, { withTheme } from "styled-components";
import {
    ButtonPrimary,
    ButtonSecondary,
    LinkButton,
    Line,
    LoginContainer,
    Login,
    Field,
} from "../../styles";
import { FcGoogle } from "react-icons/fc";

function LoginComponent() {
    return (
        <LoginContainer>
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
                    <ButtonPrimary type="submit">Log in</ButtonPrimary>
                </Field>
                <Field>
                    <Link href="/">
                        <LinkButton>Forgot the password?</LinkButton>
                    </Link>
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
            </Login>
            <Register>
                <Field>
                    <Link href="/auth/createAccount">
                        <ButtonSecondary>Create Account</ButtonSecondary>
                    </Link>
                </Field>
            </Register>
        </LoginContainer>
    );
}

export default withTheme(LoginComponent);

const Register = styled.div`
    display: flex;
    flex-direction: column;
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
