import React, { useState } from "react";
import Link from "next/link";
import { withTheme } from "styled-components";
import {
    ButtonPrimary,
    ButtonSecondary,
    LinkButton,
    Line,
    LoginContainer,
    Login,
    Field,
    Text,
} from "../../styles";

function RegisterAccountForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errors, setErrors] = useState([]);

    console.log("99", errors);

    function registerNewUser(e) {
        e.preventDefault();

        // check if passwords are correct
        if (password !== passwordRepeat) {
            setErrors((prev) => [
                ...prev,
                {
                    field: "passwordRepeat",
                    message:
                        "The password does not match the one inserted above",
                },
            ]);
        }

        fetch("/api/registerNewAccount", {
            method: "POST",
            headers: {
                ContentType: "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
    }

    return (
        <LoginContainer>
            <Login onSubmit={registerNewUser}>
                <Field>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e-mail"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Field>
                <Field>
                    <label htmlFor="passwordRepeat">Repeat password:</label>
                    <input
                        type="password"
                        name="passwordRepeat"
                        id="passwordRepeat"
                        placeholder="enter password once again"
                        autoComplete="current-password"
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                    {errors.map((err) =>
                        err.field === "passwordRepeat" ? (
                            <small>{err.message}</small>
                        ) : null
                    )}
                </Field>
                <Field>
                    <Text color={props.theme.white}>
                        By registering new account I agree with the{" "}
                        <LinkButton href="/">Terms and Conditions</LinkButton>
                    </Text>
                </Field>
                <Field top="2.7rem">
                    <ButtonPrimary type="submit">Register</ButtonPrimary>
                </Field>

                <Field>
                    <p>already have an account?</p>
                </Field>
                <Field>
                    <Link href="/</Link>">
                        <ButtonSecondary>Go to login Page</ButtonSecondary>
                    </Link>
                </Field>
                <Line />
            </Login>
        </LoginContainer>
    );
}

export default withTheme(RegisterAccountForm);
