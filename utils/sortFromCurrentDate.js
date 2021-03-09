import { DateTime } from "luxon";
import sortByDayAndMonth from "./sortByDayAndMonth";

export default function sortFromCurrentDate(events) {
    const datePlusOneWeek = DateTime.now().plus({ week: 1 });
    return events
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
}
