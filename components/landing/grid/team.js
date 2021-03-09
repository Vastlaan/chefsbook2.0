import {
    AppSection,
    Column,
    Line,
    Icon,
    BigText,
    Text2,
    TopRow,
    SmallText,
    ButtonContainer,
    PlainButton,
} from "../../../styles";
import { RiUserLine, RiArrowRightLine } from "react-icons/ri";

export default function MembersComponent({ members }) {
    const firstTwoMembers = [];
    if (members.length > 0) {
        for (let i = 0; i < 2; i++) {
            if (members[i]) {
                firstTwoMembers.push(members[i]);
            }
        }
    }
    return (
        <AppSection>
            <BigText>Team</BigText>
            <Line />
            {firstTwoMembers.length > 0 ? (
                firstTwoMembers.map((member, i) => {
                    return (
                        <Column key={`${member.id}-${i}`}>
                            <TopRow>
                                <Icon>
                                    <RiUserLine />
                                </Icon>

                                <SmallText color="#BFC0C0">
                                    {member.full_name}
                                </SmallText>
                            </TopRow>
                            <Line />
                        </Column>
                    );
                })
            ) : (
                <Column>
                    <SmallText color="#BFC0C0" wide>
                        It seems you didn't create any team yet. Click to add
                        members of your team and manage their schedule as well
                        as other data
                    </SmallText>
                    <Line />
                </Column>
            )}
            <ButtonContainer>
                <PlainButton>
                    <Text2 color="#EF8354">Read more</Text2>
                    <Icon margin="0 0 0 1.4rem" color="#EF8354">
                        <RiArrowRightLine />
                    </Icon>
                </PlainButton>
            </ButtonContainer>
        </AppSection>
    );
}
