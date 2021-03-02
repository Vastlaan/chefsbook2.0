import { useState, useEffect } from "react";
import styled from "styled-components";
import { HOURS } from "../../../../../utils/hours";
import { MINUTES } from "../../../../../utils/minutes";

export default function TimeFramesComponent({ day, setDay }) {
    const [hourStart, setHourStart] = useState(HOURS[10]);
    const [minuteStart, setMinuteStart] = useState(MINUTES[0]);
    const [hourEnd, setHourEnd] = useState(HOURS[18]);
    const [minuteEnd, setMinuteEnd] = useState(MINUTES[0]);

    useEffect(() => {
        setDay(`${hourStart}:${minuteStart} - ${hourEnd}:${minuteEnd}`);
    }, [hourStart, minuteStart, hourEnd, minuteEnd]);

    return (
        <TimeContainer>
            <TimeField justify="center">
                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>start H:</span>
                    <select
                        name="hour"
                        id="hour"
                        onChange={(e) => {
                            setHourStart(e.target.value);
                        }}
                    >
                        {HOURS.map((h) => (
                            <option
                                key={h}
                                selected={h === hourStart ? "selected" : null}
                            >
                                {h}
                            </option>
                        ))}
                    </select>
                </CustomSelect>

                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>M:</span>
                    <select
                        name="minute"
                        id="minute"
                        onChange={(e) => setMinuteStart(e.target.value)}
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
                            <option
                                key={h}
                                selected={h === hourEnd ? "selected" : null}
                            >
                                {h}
                            </option>
                        ))}
                    </select>
                </CustomSelect>

                <CustomSelect disabled={day === "free" ? true : false}>
                    <span>M:</span>
                    <select
                        name="minute"
                        id="minute"
                        onChange={(e) => setMinuteEnd(e.target.value)}
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
const CustomSelect = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    span {
        font-size: 1.4rem;
        color: ${(p) => (p.disabled ? p.theme.grey3 : p.theme.secondary)};
    }

    select {
        margin: 0 0.3rem;
        border: 1px solid
            ${(p) => (p.disabled ? p.theme.grey3 : p.theme.secondary)};
        border-radius: 5px;
        background-color: transparent;
        padding: 0.3rem 0.7rem;
        color: ${(p) => (p.disabled ? p.theme.grey3 : p.theme.secondary)};
        font-size: 1.4rem;
        pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

        &:active,
        :focus {
            outline: none;
        }

        option {
            font-size: 1.4rem;
            color: ${(p) => p.theme.secondary};
        }
    }
`;

const TimeField = styled.div`
    margin: 0.7rem auto;
    display: flex;
    width: 100%;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
