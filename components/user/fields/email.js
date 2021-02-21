import styled from "styled-components";
import {
    Field,
    FlexRow,
    PlainButton,
    Edit,
    InputFlexible,
} from "../../../styles";
import {
    RiEditLine,
    RiCheckboxCircleLine,
    RiIndeterminateCircleLine,
} from "react-icons/ri";

export default function EmailField({
    email,
    setEmail,
    currentlyEdited,
    setCurrentlyEdited,
    userEmail,
}) {
    return (
        <FieldRow>
            <label htmlFor="email">E-mail:</label>
            {currentlyEdited !== "email" ? (
                <InputFlexible
                    type="text"
                    name="email"
                    value={email ? email : userEmail}
                    disabled
                />
            ) : (
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            )}

            {currentlyEdited === "email" ? (
                <FlexRow>
                    <PlainButton
                        onClick={() => {
                            setCurrentlyEdited("");
                        }}
                    >
                        <RiCheckboxCircleLine color="#6DAA6C" />
                    </PlainButton>
                    <PlainButton
                        onClick={() => {
                            setEmail("");
                            setCurrentlyEdited("");
                        }}
                    >
                        <RiIndeterminateCircleLine color="orangered" />
                    </PlainButton>
                </FlexRow>
            ) : (
                <Edit>
                    <PlainButton
                        onClick={() => {
                            setCurrentlyEdited("email");
                        }}
                    >
                        <RiEditLine />
                    </PlainButton>
                </Edit>
            )}
        </FieldRow>
    );
}

const FieldRow = styled(Field)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;

    label {
        margin: 0;
    }
    input {
        margin: 0 1.4rem;
    }
`;
