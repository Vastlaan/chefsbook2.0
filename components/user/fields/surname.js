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

export default function SurnameComponent({
    surname,
    setSurname,
    currentlyEdited,
    setCurrentlyEdited,
    userSurname,
}) {
    return (
        <FieldRow>
            <label htmlFor="surname">Last Name:</label>
            {currentlyEdited !== "surname" ? (
                <InputFlexible
                    type="text"
                    name="surname"
                    value={surname ? surname : userSurname}
                    disabled
                />
            ) : (
                <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            )}

            {currentlyEdited === "surname" ? (
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
                            setSurname("");
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
                            setCurrentlyEdited("surname");
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
