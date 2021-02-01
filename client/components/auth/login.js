import React from "react";
import styled from "styled-components";
import { fonts, colors } from "../../styles";

export default function LoginComponent() {
    return (
        <Container>
            <Login>
                <Field>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" name="email" id="email" />
                </Field>
                <Field>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </Field>
            </Login>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.black};
    padding: 4.7rem 2.7rem;
`;
const Login = styled.form`
    display: flex;
    flex-direction: column;
`;
const Field = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.9rem;

    label {
        color: ${colors.grey1};
        font-size: 1.9rem;
        margin-bottom: 0.9rem;
    }
    input {
        border: none;
        background-color: ${colors.white};
        padding: 0.9rem 1.4rem;
        font-size: 1.6rem;
        color: ${colors.black};
    }
`;
