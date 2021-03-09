import { useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../../store";
import EventNote from "../event_note";
import { FlexCol, Text3 } from "../../../styles";

export default function EventsGrid({ events, day, month, year }) {
    const { state, dispatch } = useContext(Context);
    const router = useRouter();

    const existingEventsArray = events.filter(
        (e) => e.day === day && e.month === month && e.year === year
    );

    function sortByHourAndMinute(prev, next) {
        if (prev.hour === next.hour) {
            return prev.minute - next.minute;
        } else {
            return prev.hour - next.hour;
        }
    }

    if (existingEventsArray.length > 0) {
        const sortedEvents = existingEventsArray.sort(sortByHourAndMinute);
        return (
            <FlexCol>
                {sortedEvents &&
                    sortedEvents.map((currentEvent, i) => {
                        const { hour, minute, description, id } = currentEvent;
                        return (
                            <EventNote
                                key={i}
                                hour={hour}
                                minute={minute}
                                description={description}
                                id={id}
                            />
                        );
                    })}
            </FlexCol>
        );
    } else {
        return (
            <Text3 wide>
                It seems you don't have any plans for today. Click button above
                to Create New Event.
            </Text3>
        );
    }
}
