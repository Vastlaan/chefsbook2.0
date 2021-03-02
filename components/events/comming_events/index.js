import { DateTime } from "luxon";
import { useContext, useState, useEffect } from "react";
import EventNote from "../event_note";
import { Context } from "../../../store";
import { BigText, FlexCol } from "../../../styles";

export default function ComingEventsComponent() {
    const { state, dispatch } = useContext(Context);
    const datePlusOneWeek = DateTime.now().plus({ week: 1 });

    const [commingWeekEvents, setCommingWeekEvents] = useState([]);

    useEffect(() => {
        if (state.user.events) {
            const selectedAndSorted = state.user.events
                .filter(
                    (ev) =>
                        DateTime.fromObject({
                            year: ev.year,
                            month: ev.month,
                            day: ev.day,
                        }).startOf("day") <= datePlusOneWeek.startOf("day") &&
                        DateTime.fromObject({
                            year: ev.year,
                            month: ev.month,
                            day: ev.day,
                        }).startOf("day") >= DateTime.now().startOf("day")
                )
                .sort(sortByDayAndMonth);
            setCommingWeekEvents(selectedAndSorted);
        }
    }, [state]);

    function sortByDayAndMonth(prev, next) {
        if (prev.month === next.month) {
            return prev.day - next.day;
        } else {
            return prev.month - next.month;
        }
    }

    return (
        <FlexCol>
            <BigText>Comming events:</BigText>

            {commingWeekEvents.length > 0
                ? commingWeekEvents.map((currentEvent, i) => {
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
                : null}
        </FlexCol>
    );
}
