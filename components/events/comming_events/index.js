import { DateTime } from "luxon";
import { useContext, useState, useEffect } from "react";
import EventNote from "../event_note";
import { Context } from "../../../store";
import sortFromCurrentDate from "../../../utils/sortFromCurrentDate";
import { BigText, FlexCol, Text2, Line } from "../../../styles";

export default function ComingEventsComponent() {
    const { state, dispatch } = useContext(Context);

    const [commingWeekEvents, setCommingWeekEvents] = useState([]);

    useEffect(() => {
        if (state.user.events) {
            const selectedAndSorted = sortFromCurrentDate(state.user.events);
            setCommingWeekEvents(selectedAndSorted);
        }
    }, [state]);

    return (
        <FlexCol>
            <BigText>Comming events:</BigText>
            <Line margin="0 !important" />

            {commingWeekEvents.length > 0 ? (
                commingWeekEvents.map((currentEvent, i) => {
                    const {
                        day,
                        month,
                        year,
                        hour,
                        minute,
                        description,
                        id,
                    } = currentEvent;
                    return (
                        <EventNote
                            key={i}
                            date={{ day, month, year }}
                            hour={hour}
                            minute={minute}
                            description={description}
                            id={id}
                        />
                    );
                })
            ) : (
                <Text2>
                    You haven't created any event yet. Choose the day you want
                    to create an event for, click on it at the caledar above and
                    create a new event.
                </Text2>
            )}
        </FlexCol>
    );
}
