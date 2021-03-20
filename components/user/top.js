import { BigText, TopRow, SmallText } from "../../styles";

export default function TopComponent({ created }) {
    return (
        <TopRow>
            <BigText>Your Profile:</BigText>
            <SmallText style={{ marginLeft: "auto" }}>
                Account created at: <span>{created}</span>
            </SmallText>
        </TopRow>
    );
}
