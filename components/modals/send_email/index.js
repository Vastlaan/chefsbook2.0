import { useContext, useState } from "react";
import { Context } from "../../../store";
import styled from "styled-components";
import ListOfMembers from "./list_of_members";
import Email from "./email";
import {
    respond,
    BigText,
    Text3,
    Text2,
    List,
    FlexRow,
    ButtonPrimary,
    ButtonSecondary,
    Line,
    Field,
} from "../../../styles";

export default function SendEmailModal({ setModal, title, body }) {
    const { state } = useContext(Context);
    // grab list of members which have an email
    const members = state.user.members.filter((m) => m.email);
    // create an array of members' emails including user email
    const listOfEmailAddresses = [
        ...members.map((m) => m.email),
        state.user.email,
    ];
    const [selectedMembers, setSelectedMembers] = useState(
        listOfEmailAddresses
    );
    const [errors, setErrors] = useState({});

    async function sendEmail() {
        setErrors({});
        if (selectedMembers.length === 0) {
            return setErrors({
                type: "error",
                field: "general",
                message: "There are no recipients selected",
            });
        }
        const res = await fetch("/api/mail/sendMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipients: selectedMembers,
                title,
                body,
            }),
        });
        const data = await res.json();

        if (data.error) {
            return setErrors({
                type: "error",
                field: "general",
                message: "Something went wrong",
            });
        }

        // if everything is successful, close modal
        return setModal(false);
    }

    return (
        <Container>
            <Box>
                <BigText>Select recipients from the list:</BigText>
                <ListOfMembers
                    members={members}
                    selectedMembers={selectedMembers}
                    setSelectedMembers={setSelectedMembers}
                />
                <Line />

                <Email
                    selectedMembers={selectedMembers}
                    title={tilte}
                    body={body}
                />

                <Line />

                {errors.type === "general" && <small>{errors.message}</small>}

                <FlexRow>
                    <ButtonSecondary onClick={sendEmail}>Send</ButtonSecondary>
                    <ButtonPrimary
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Cancel
                    </ButtonPrimary>
                </FlexRow>
            </Box>
        </Container>
    );
}
const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 98;
`;
const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.7rem 1.4rem;
    border: 1px solid ${(p) => p.theme.primary};
    border-radius: 5px;
    box-shadow: 0 0 1rem ${(p) => p.theme.primary};
    min-width: 90vw;
    max-width: 90vw;
    max-height: 90vh;
    overflow: scroll;

    ${() =>
        respond(
            "s",
            "padding: 4.7rem 2.7rem; min-width: 50vw; max-width: 50vw;"
        )}

    button {
        margin: 1.4rem 1.4rem 0 0;
    }
`;
const Email = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
