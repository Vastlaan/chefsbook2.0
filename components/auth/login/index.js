import React, { useState, useContext } from "react";
import { Context } from "../../../store";
import Link from "next/link";
import styled, { withTheme } from "styled-components";
import Email from "../email";
import Password from "../password";

import {
    ButtonPrimary,
    ButtonSecondary,
    LinkButton,
    Line,
    LoginContainer,
    Login,
    Field,
} from "../../../styles";
import { FcGoogle } from "react-icons/fc";

function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { state, dispatch } = useContext(Context);

    function loginUser(e) {
        e.preventDefault();

        setErrors({});

        fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.type === "error") {
                    return setErrors(data);
                } else {
                    if (data.user) {
                        // set login status to true
                        dispatch({ type: "setUser", payload: data.user });
                        dispatch({ type: "isLogged", payload: true });
                    } else {
                        return router.push("/");
                    }
                }
            })
            .catch((e) => {
                console.error(e);
                setErrors({
                    type: "error",
                    field: "password",
                    message: "Something went wrong",
                });
            });
    }

    return (
        <LoginContainer>
            <Login onSubmit={loginUser}>
                <Email email={email} setEmail={setEmail} errors={errors} />

                <Password
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                />

                <Field top="2.7rem">
                    <ButtonPrimary type="submit">Log in</ButtonPrimary>
                </Field>

                <Field>
                    <Link href="/auth/restoreCredentials">
                        <LinkButton type="button">
                            Forgot the password?
                        </LinkButton>
                    </Link>
                </Field>
                <Field>
                    <p>or</p>
                </Field>
                <Field>
                    <Link href="/auth/googleSignIn">
                        <ButtonGoogle
                            // onClick={signInToGoogle}
                            type="button"
                            color2="#1B1B1E"
                        >
                            <FcGoogle />
                            Sign in with Google
                        </ButtonGoogle>
                    </Link>
                </Field>
                <Line />
            </Login>
            <Register>
                <Field>
                    <Link type="button" href="/auth/createAccount">
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
