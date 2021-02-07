import React, { useState, useContext } from "react";
import { Context } from "../../store";
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { state, dispatch } = useContext(Context);

    function loginUser(e) {
        e.preventDefault();

        setError("");

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    return setError(data.error);
                } else {
                    // save token in localStorage
                    window.localStorage.setItem(
                        "chefsbookJWTToken",
                        data.token
                    );
                    return dispatch({ type: "setUser", payload: data.user });
                }
            });
    }

    return (
        <LoginContainer>
            <Login onSubmit={loginUser}>
                <Field>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e-mail"
                        autoComplete="username"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {error ? <small>{error}</small> : null}
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
    color: ${(p) => p.theme.grey3};
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
