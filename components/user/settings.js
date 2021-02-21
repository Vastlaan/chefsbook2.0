import { useState, useContext } from "react";
import styled from "styled-components";
import { Context } from "../../store";
import MainGridComponent from "../main_grid";
import Email from "./fields/email";
import Name from "./fields/name";
import Surname from "./fields/surname";
import AccountPhotoComponent from "./fields/account_photo";
import { validateEmail, validateMimeType } from "../../validations";
import {
    respond,
    BigText,
    Line,
    FlexRow,
    ButtonSecondary,
    SmallText,
    Form1,
} from "../../styles";

export default function UserSettingsComponent({ user }) {
    const { state, dispatch } = useContext(Context);

    console.log("Prime", user);

    const [currentlyEdited, setCurrentlyEdited] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [accountPhoto, setAccountPhoto] = useState(null);
    const [accountPhotoBlob, setAccountPhotoBlog] = useState(null);
    const [errors, setErrors] = useState([]);

    function updateUserProfile(e) {
        e.preventDefault();
        console.log(email, name, surname, accountPhoto);

        let dataToSend = new FormData();
        if (email) {
            const isEmailValid = validateEmail(email);
            if (isEmailValid.type === "error") {
                return setErrors(isEmailValid);
            }
            dataToSend.append("email", email);
        }
        if (name) {
            dataToSend.append("name", name);
        }
        if (surname) {
            dataToSend.append("surname", surname);
        }
        if (accountPhoto) {
            const isPhotoValid = validateMimeType(accountPhoto);
            if (isPhotoValid.type === "error") {
                return setErrors(isPhotoValid);
            }
            dataToSend.append("file", accountPhoto);
        }

        fetch("/api/user/updateUser", {
            method: "POST",
            body: dataToSend,
        })
            .then((res) => res.json())
            .then((user) => {
                if (user.error) {
                    setErrors({
                        type: "error",
                        field: "general",
                        message: user.error,
                    });
                }
                console.log(user);
                // dispatch({ type: "updateUser", payload: user });
            })
            .catch((e) => {
                console.error(e);
                setErrors({
                    type: "error",
                    field: "general",
                    message: "Ups, something went wrong",
                });
            });
    }

    return (
        <MainGridComponent>
            <Form1 onSubmit={updateUserProfile}>
                <BigText>Your Profile:</BigText>
                <Line />

                <Email
                    email={email}
                    setEmail={setEmail}
                    currentlyEdited={currentlyEdited}
                    setCurrentlyEdited={setCurrentlyEdited}
                    userEmail={user.email}
                />

                <Line />

                <Name
                    name={name}
                    setName={setName}
                    currentlyEdited={currentlyEdited}
                    setCurrentlyEdited={setCurrentlyEdited}
                    userName={user.name}
                />
                <Line />

                <Surname
                    surname={surname}
                    setSurname={setSurname}
                    currentlyEdited={currentlyEdited}
                    setCurrentlyEdited={setCurrentlyEdited}
                    userSurname={user.surname}
                />

                <Line />

                <AccountPhotoComponent
                    userAccountPhoto={user.account_photo_url}
                    setAccountPhoto={setAccountPhoto}
                    accountPhotoBlob={accountPhotoBlob}
                    setAccountPhotoBlog={setAccountPhotoBlog}
                    errors={errors}
                    setErrors={setErrors}
                />

                <FlexRow>
                    <SmallText>
                        Account created at: <span>{user.created_at}</span>
                    </SmallText>
                </FlexRow>
                {errors.field === "general" && <small>{errors.message}</small>}
                <FlexRow>
                    <ButtonSecondary type="submit">
                        Save changes
                    </ButtonSecondary>
                </FlexRow>
            </Form1>
        </MainGridComponent>
    );
}
