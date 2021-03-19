import { useState } from "react";
import Link from "next/link";
import Email from "../email";
import {
    ButtonPrimary,
    ButtonSecondary,
    Line,
    LoginContainer,
    Login,
    Field,
    Text2,
} from "../../../styles";

function RestoreCredentialsComponent() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    async function restorePassword(e) {
        e.preventDefault();

        setErrors({});

        const res = await fetch("/api/auth/restorePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (data.type === "error") {
            setErrors(data);
        }

        console.log(data);
    }

    return (
        <LoginContainer>
            <Login onSubmit={restorePassword}>
                <Text2>
                    Please fill in your e-mail address. <br />
                    Within couple of minutes you will recive an e-mail with new
                    password to login
                </Text2>
                <Line />
                <Email email={email} setEmail={setEmail} errors={errors} />

                <Field top="2.7rem">
                    <ButtonPrimary type="submit">
                        Restore Password
                    </ButtonPrimary>
                </Field>

                <Line />

                <Field>
                    <Link href="/">
                        <ButtonSecondary>Go to login Page</ButtonSecondary>
                    </Link>
                </Field>
            </Login>
        </LoginContainer>
    );
}

export default RestoreCredentialsComponent;
