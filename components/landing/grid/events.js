import sortFromCurrentDate from "../../../utils/sortFromCurrentDate";
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

export default function EventsComponent({ events }) {
    const actualEvents = sortFromCurrentDate(events);
    const firstTwoEvents = [];
    if (actualEvents.length > 0) {
        for (let i = 0; i < 2; i++) {
            if (actualEvents[i]) {
                firstTwoEvents.push(actualEvents[i]);
            }
        }
    }

    return (
        <AppSection>
            <BigText>Events</BigText>
            <Line />
            {firstTwoEvents.length > 0 ? (
                firstTwoEvents.map((event, i) => {
                    return (
                        <Column key={`${event.id}-${i}`}>
                            <TopRow>
                                <Icon>
                                    <RiCalendar2Line />
                                </Icon>

                                <SmallText color="#BFC0C0">
                                    {event.description.substring(0, 20)}...
                                </SmallText>
                            </TopRow>
                            <Line />
                        </Column>
                    );
                })
            ) : (
                <Column>
                    <SmallText color="#BFC0C0" wide>
                        It seems you didn't create any event yet. Click to
                        display Calender and add events to it. Event could be
                        anything like reservation or important appointment.
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
