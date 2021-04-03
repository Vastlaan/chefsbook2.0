import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { withTheme } from "styled-components";
import { Context } from "../../../store";
import { validatePassword, validateEmail } from "../../../validations";
import Email from "../email";
import Password from "../password";
import PasswordRepeat from "./repeat_password";

import {
    ButtonPrimary,
    ButtonSecondary,
    LinkButton,
    Line,
    LoginContainer,
    Login,
    Field,
    Text,
} from "../../../styles";

function RegisterAccountForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [errors, setErrors] = useState({});

    const { state, dispatch } = useContext(Context);

    const router = useRouter();

    function registerNewUser(e) {
        e.preventDefault();

        setErrors("");

        // check emails validation
        const isEmailValid = validateEmail(email);
        if (isEmailValid.type === "error") {
            return setErrors({
                field: isEmailValid.field,
                message: isEmailValid.message,
            });
        }

        // check if passwords are correct
        const isPasswordValid = validatePassword(password, passwordRepeat);
        if (isPasswordValid.type === "error") {
            return setErrors({
                field: isPasswordValid.field,
                message: isPasswordValid.message,
            });
        }

        fetch("/api/auth/registerNewAccount", {
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
                    dispatch({ type: "setUser", payload: data.user });

                    return router.push("/");
                }
            });
    }

    return (
        <LoginContainer>
            <Login onSubmit={registerNewUser}>
                <Email email={email} setEmail={setEmail} errors={errors} />

                <Password
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                />

                <PasswordRepeat
                    setPasswordRepeat={setPasswordRepeat}
                    errors={errors}
                />
                <Field>
                    <Text color={props.theme.white}>
                        By registering new account I agree with the{" "}
                        <LinkButton href="/">Terms and Conditions</LinkButton>
                    </Text>
                </Field>
                <Field top="2.7rem">
                    {errors.field === "general" && (
                        <small>{errors.message}</small>
                    )}
                    <ButtonPrimary type="submit">Register</ButtonPrimary>
                </Field>

                <Field>
                    <p>already have an account?</p>
                </Field>
                <Field>
                    <Link href="/">
                        <ButtonSecondary>Go to login Page</ButtonSecondary>
                    </Link>
                </Field>
                <Line />
            </Login>
        </LoginContainer>
    );
}

export default withTheme(RegisterAccountForm);
