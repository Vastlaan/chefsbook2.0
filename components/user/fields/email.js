import styled from "styled-components";
import { Field, InputFlexible } from "../../../styles";

export default function EmailField({ email, userEmail }) {
    return (
        <FieldRow>
            <label htmlFor="email">E-mail:</label>

            <InputFlexible
                type="text"
                name="email"
                value={email ? email : userEmail}
                disabled
            />
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
