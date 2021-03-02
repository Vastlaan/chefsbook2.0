import Range from "./range";
import SwitchWeeks from "./switch_weeks";
import Row from "./row";
import { WEEK_DAYS } from "../../../../../utils/weekDays";
import { TableGrid } from "../../../../../styles";

export default function TableComponent(props) {
    const { forWeek, setForWeek, dt, setDt } = props;

    function setWeek(direction) {
        if (direction === "previous") {
            setForWeek(dt.minus({ week: 1 }).weekNumber.toString());
            setDt((prevState) => prevState.minus({ week: 1 }));
        } else {
            setForWeek(dt.plus({ week: 1 }).weekNumber.toString());
            setDt((prevState) => prevState.plus({ week: 1 }));
        }
    }

    return (
        <TableGrid>
            <Range theme={props.theme} forWeek={forWeek} dt={dt} />

            <SwitchWeeks
                theme={props.theme}
                forWeek={forWeek}
                setWeek={setWeek}
            />

            {WEEK_DAYS.map((currentDay, i) => {
                const dayToDisplay = dt.startOf("week").plus({ day: i }).day;
                return (
                    <Row
                        key={`weekday-${i}-${currentDay}`}
                        {...props}
                        currentDay={currentDay}
                        dayToDisplay={dayToDisplay}
                    />
                );
            })}
        </TableGrid>
    );
}
