import { WeekdaysPanel, WeekdayPanelRow } from "../../../../styles";
import { WEEK_DAYS } from "../../../../utils/weekDays";

export default function DateComponent({ dt }) {
    return (
        <WeekdaysPanel>
            {WEEK_DAYS.map((currentDay, i) => {
                const dayToDisplay = dt.startOf("week").plus({ day: i }).day;
                return (
                    <WeekdayPanelRow key={`weekday-${i}-${currentDay}`}>
                        <p>
                            {currentDay.substring(0, 3)}{" "}
                            <sup>
                                {`${dayToDisplay}${
                                    dayToDisplay === 1
                                        ? "st"
                                        : dayToDisplay === 31
                                        ? "st"
                                        : dayToDisplay === 2
                                        ? "nd"
                                        : "th"
                                }`}
                            </sup>
                        </p>
                    </WeekdayPanelRow>
                );
            })}
        </WeekdaysPanel>
    );
}
