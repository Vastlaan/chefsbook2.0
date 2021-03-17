import styled from "styled-components";
import { BigText, Text3, Text2, FlexRow } from "../../../styles";

export default function EmailComponent({ selectedMembers, title, body }) {
    return (
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
    );
}
const Email = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
