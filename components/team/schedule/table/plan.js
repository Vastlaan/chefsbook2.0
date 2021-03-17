import Link from "next/link";
import { TableRow, WeekdaysPanel, WeekdayPanelRow } from "../../../../styles";
import { WEEK_DAYS } from "../../../../utils/weekDays";

export default function Plan({ member, theme, scheduleToRender, weekNumber }) {
    return (
        <>
            <Link href={`/team/edit/${member.id}?week=${weekNumber}`}>
                <TableRow color={theme.secondary} hovered={true}>
                    <p>{member.full_name}</p>
                </TableRow>
            </Link>
            <WeekdaysPanel>
                {WEEK_DAYS.map((currentDay) => {
                    const workingHoursSplitted = scheduleToRender[
                        currentDay
                    ].split(" - ");
                    return (
                        <WeekdayPanelRow key={`user-days-${currentDay}`}>
                            <p>{workingHoursSplitted[0]}</p>

                            <p>{workingHoursSplitted[1]}</p>
                        </WeekdayPanelRow>
                    );
                })}
            </WeekdaysPanel>
        </>
    );
}
