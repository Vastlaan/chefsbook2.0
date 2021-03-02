import TimeFrames from "./time_frames";
import { TableRow } from "../../../../../styles";

export default function RowComponent(props) {
    const {
        currentDay,
        dayToDisplay,
        monday,
        setMonday,
        tuesday,
        setTuesday,
        wednesday,
        setWednesday,
        thursday,
        setThursday,
        friday,
        setFriday,
        saturday,
        setSaturday,
        sunday,
        setSunday,
    } = props;

    function decideWhichDay(day) {
        switch (day) {
            case "Monday":
                return [monday, setMonday];
            case "Tuesday":
                return [tuesday, setTuesday];
            case "Wednesday":
                return [wednesday, setWednesday];
            case "Thursday":
                return [thursday, setThursday];
            case "Friday":
                return [friday, setFriday];
            case "Saturday":
                return [saturday, setSaturday];
            case "Sunday":
                return [sunday, setSunday];
            default:
                return [monday, setMonday];
        }
    }
    return (
        <>
            <TableRow>
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
            </TableRow>
            <TableRow>
                <TimeFrames
                    day={decideWhichDay(currentDay)[0]}
                    setDay={decideWhichDay(currentDay)[1]}
                />
            </TableRow>
        </>
    );
}
