import { useState } from "react";
import { FlexRow, ButtonSecondary, BigText } from "../../styles";
import PasswordOld from "./fields/password_old";
import PasswordNew from "./fields/password_new";
import PasswordNewRepeat from "./fields/password_new_repeat";
import { validatePassword } from "../../validations";
import Modal from "../modals/successful";

export default function ChangePasswordComponent() {
    const [errors, setErrors] = useState({});
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordNewRepeat, setPasswordNewRepeat] = useState("");
    const [displayModal, setDisplayModal] = useState(false);
    const [message, setMessage] = useState("");

    async function changePassword(e) {
        e.preventDefault();
        // resert errors if previously occured
        setErrors({});

        // validate fields
        const isNewPasswordValid = validatePassword(passwordNew);
        if (isNewPasswordValid.type === "error") {
            return setErrors(isNewPasswordValid);
        }

        const isNewPasswordValidRepeat = validatePassword(
            passwordNew,
            passwordNewRepeat
        );
        if (isNewPasswordValidRepeat.type === "error") {
            return setErrors(isNewPasswordValidRepeat);
        }

        const dataToSend = {
            password,
            passwordNew,
            passwordNewRepeat,
        };

        console.log(dataToSend);

        const res = await fetch("/api/auth/changePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await res.json();

        if (data.error) {
            return setErrors({
                type: "error",
                field: "general",
                message: data.error,
            });
        }

        // prompt successful modal
        setMessage(data.success);
        setDisplayModal(true);
    }

    return (
        <form onSubmit={changePassword}>
            <BigText>Change Password:</BigText>
            <PasswordOld
                password={password}
                setPassword={setPassword}
                errors={errors}
            />
            <PasswordNew
                password={passwordNew}
                setPassword={setPasswordNew}
                errors={errors}
            />
            <PasswordNewRepeat
                password={passwordNewRepeat}
                setPassword={setPasswordNewRepeat}
                errors={errors}
            />
            {errors.field === "general" && <small>{errors.message}</small>}
            <FlexRow>
                <ButtonSecondary type="submit">Change Password</ButtonSecondary>
            </FlexRow>

            {displayModal && (
                <Modal setModal={setDisplayModal} message={message} />
            )}
        </form>
    );
}
