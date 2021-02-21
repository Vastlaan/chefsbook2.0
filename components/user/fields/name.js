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

export default function NameField({
    name,
    setName,
    currentlyEdited,
    setCurrentlyEdited,
    userName,
}) {
    return (
        <FieldRow>
            <label htmlFor="name">First Name:</label>
            {currentlyEdited !== "name" ? (
                <InputFlexible
                    type="text"
                    name="name"
                    value={name ? name : userName}
                    disabled
                />
            ) : (
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            )}

            {currentlyEdited === "name" ? (
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
                            setName("");
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
                            setCurrentlyEdited("name");
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
