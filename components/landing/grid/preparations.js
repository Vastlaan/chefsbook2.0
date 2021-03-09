import { DateTime } from "luxon";
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
import { RiCalendar2Line, RiArrowRightLine } from "react-icons/ri";

export default function PreparationsComponent({ preparations }) {
    const firstTwoPreparations = [];
    if (preparations.length > 0) {
        for (let i = 0; i < 2; i++) {
            if (preparations[i]) {
                firstTwoPreparations.push(preparations[i]);
            }
        }
    }

    return (
        <AppSection>
            <BigText>Preparations</BigText>
            <Line />
            {firstTwoPreparations.length > 0 ? (
                firstTwoPreparations.map((preparation, i) => {
                    return (
                        <Column key={`${preparation.id}-${i}`}>
                            <TopRow>
                                <Icon>
                                    <RiCalendar2Line />
                                </Icon>

                                <SmallText color="#BFC0C0">
                                    {DateTime.fromObject({
                                        day: parseInt(preparation.day),
                                        month: parseInt(preparation.month),
                                        year: parseInt(preparation.year),
                                    }).toLocaleString(DateTime.DATE_FULL)}
                                </SmallText>
                            </TopRow>
                            <Line />
                        </Column>
                    );
                })
            ) : (
                <Column>
                    <SmallText color="#BFC0C0" wide>
                        It seems you didn't create any preparation list yet.
                        Click to create new or/and manage existing lists.
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
