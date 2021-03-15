import { useContext, useState } from "react";
import { Context } from "../../store";
import styled from "styled-components";
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
} from "../../styles";

export default function SendEmailModal({ setModal, title, body }) {
    const { state } = useContext(Context);
    // grab list of members which have an email
    const members = state.user.members.filter((m) => m.email);
    // create an array of members' emails including user email
    const listOfEmailAddresses = [
        ...members.map((m) => m.email),
        state.user.email,
    ];
    console.log(22, listOfEmailAddresses);
    const [selectedMembers, setSelectedMembers] = useState(
        listOfEmailAddresses
    );
    const [errors, setErrors] = useState({});

    async function sendEmail() {
        if (selectedMembers.length === 0) {
            return setErrors({});
        }
        console.log(selectedMembers, title, body);

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
                <List>
                    {members.map((m, i) => {
                        return (
                            <Field
                                direction="row"
                                align="center"
                                key={`member-${i}`}
                            >
                                <input
                                    type="checkbox"
                                    name="member"
                                    checked={selectedMembers.includes(m.email)}
                                    onChange={() =>
                                        setSelectedMembers((prevState) => {
                                            if (prevState.includes(m.email)) {
                                                return prevState.filter(
                                                    (each) => each !== m.email
                                                );
                                            } else {
                                                return [...prevState, m.email];
                                            }
                                        })
                                    }
                                />
                                <label htmlFor="member">
                                    &nbsp;{m.full_name} ({m.email})
                                </label>
                            </Field>
                        );
                    })}
                </List>
                <Line />
                <Email>
                    <BigText>E-mail content:</BigText>
                    <FlexRow>
                        <Text2 color="#6DAA6C">Recipients:</Text2>
                        {selectedMembers.length > 0 ? (
                            selectedMembers.map((email) => (
                                <Text3 key={email}>&nbsp;{email},</Text3>
                            ))
                        ) : (
                            <Text3 wide>
                                &nbsp; please select member from the list above
                            </Text3>
                        )}
                    </FlexRow>
                    <FlexRow>
                        <Text2 color="#6DAA6C">Title:</Text2>{" "}
                        <Text3 wide>&nbsp;{title}</Text3>
                    </FlexRow>
                    <FlexRow>
                        <Text2 color="#6DAA6C">Body:</Text2>{" "}
                        <Text3 wide>&nbsp;{body}</Text3>
                    </FlexRow>
                </Email>
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
