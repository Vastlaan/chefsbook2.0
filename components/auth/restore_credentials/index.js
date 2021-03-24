import { useState } from "react";
import Link from "next/link";
import Email from "../email";
import Modal from "../../modals/successful";
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
    const [displayModal, setDisplayModal] = useState(false);
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
            return setErrors(data);
        }

        setDisplayModal(true);
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
            {displayModal && (
                <Modal
                    setModal={setDisplayModal}
                    message="Your new password has been sent to your e-mail. It may take up to 45 minutes to recive it. Check also your SPAM box. If you don't recive any e-mail with new password within 2 hours, please repeat the procedure."
                ></Modal>
            )}
        </LoginContainer>
    );
}

export default RestoreCredentialsComponent;
