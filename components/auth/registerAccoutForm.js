import React, { useState } from "react";
import Link from "next/link";
import { withTheme } from "styled-components";
import validatePassword from "../../validations/password";
import validateEmail from "../../validations/email";
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

    function registerNewUser(e) {
        e.preventDefault();

        setErrors([]);
        console.log("fired");
        // check emails validation
        const isEmailValid = validateEmail(email);
        if (isEmailValid.type === "error") {
            return setErrors((prevState) => [
                ...prevState,
                { field: isEmailValid.field, message: isEmailValid.message },
            ]);
        }

        // check if passwords are correct
        const isPasswordValid = validatePassword(password, passwordRepeat);
        if (isPasswordValid.type === "error") {
            return setErrors((prevState) => [
                ...prevState,
                {
                    field: isPasswordValid.field,
                    message: isPasswordValid.message,
                },
            ]);
        }
        console.log("fired");
        fetch("/api/registerNewAccount", {
            method: "POST",
            headers: {
                ContentType: "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setErrors((prevState) => [
                        ...prevState,
                        { message: data.error },
                    ]);
                    console.log(data.error);
                    return;
                } else {
                    console.log(data.user);
                }
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
                    {errors.map((err, i) =>
                        err.field === "email" ? (
                            <small key={`error-${i}`}>{err.message}</small>
                        ) : null
                    )}
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
                    {errors.map((err) =>
                        err.field === "password" ? (
                            <small>{err.message}</small>
                        ) : null
                    )}
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
