import { useState, useEffect } from "react";
import styled from "styled-components";
import { CustomSelect } from "../../../../../styles";
import { HOURS } from "../../../../../utils/hours";
import { MINUTES } from "../../../../../utils/minutes";

export default function TimeFramesComponent({ day, setDay }) {
    const [hourStart, setHourStart] = useState(HOURS[10]);
    const [minuteStart, setMinuteStart] = useState(MINUTES[0]);
    const [hourEnd, setHourEnd] = useState(HOURS[18]);
    const [minuteEnd, setMinuteEnd] = useState(MINUTES[0]);

    useEffect(() => {
        if (day !== "free") {
            setDay(`${hourStart}:${minuteStart} - ${hourEnd}:${minuteEnd}`);
        }
    }, [hourStart, hourEnd, minuteEnd, minuteStart]);

    useEffect(() => {
        if (day !== "free") {
            const startHours = day.split(" - ")[0];
            const stopHours = day.split(" - ")[1];

            setHourStart(startHours.split(":")[0]);
            setMinuteStart(startHours.split(":")[1]);
            setHourEnd(stopHours.split(":")[0]);
            setMinuteEnd(stopHours.split(":")[1]);
        }
    }, [day]);

    return (
        <TimeContainer>
            <TimeField justify="center">
                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>start H:</span>
                    <select
                        name="hour"
                        id="hour"
                        value={hourStart}
                        onChange={(e) => {
                            setHourStart(e.target.value);
                        }}
                    >
                        {HOURS.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </CustomSelect>

                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>M:</span>
                    <select
                        name="minute"
                        id="minute"
                        onChange={(e) => {
                            setMinuteStart(e.target.value);
                        }}
                    >
                        {MINUTES.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </CustomSelect>
            </TimeField>

            <TimeField justify="center">
                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>stop &nbsp;H:</span>
                    <select
                        name="hour"
                        id="hour"
                        value={hourEnd}
                        onChange={(e) => {
                            setHourEnd(e.target.value);
                        }}
                    >
                        {HOURS.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </CustomSelect>

                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>M:</span>
                    <select
                        name="minute"
                        id="minute"
                        onChange={(e) => {
                            setMinuteEnd(e.target.value);
                        }}
                    >
                        {MINUTES.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </CustomSelect>
            </TimeField>
            <TimeField justify="center">
                <CustomSelect>
                    <span> DAY OFF &nbsp; </span>

                    <input
                        type="checkbox"
                        name="dayoff"
                        id="dayoff"
                        checked={day === "free"}
                        onChange={() =>
                            day === "free"
                                ? setDay(
                                      `${hourStart}:${minuteStart} - ${hourEnd}:${minuteEnd}`
                                  )
                                : setDay("free")
                        }
                    />
                </CustomSelect>
            </TimeField>
        </TimeContainer>
    );
}

const TimeField = styled.div`
    margin: 0.7rem auto;
    display: flex;
    width: 100%;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
