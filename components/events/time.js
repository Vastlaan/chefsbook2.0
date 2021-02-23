import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { FlexRow } from "../../styles";
import { RiTimeLine } from "react-icons/ri";

export default function Time() {
    function generateTimeObject(dt) {
        return {
            hour: dt.now().hour,
            minut: dt.now().minute,
            second: dt.now().second,
        };
    }

    const [time, updateTime] = useState(generateTimeObject(DateTime));

    useEffect(() => {
        const interval = setInterval(
            () => updateTime(generateTimeObject(DateTime)),
            1000
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <TimeString>
            <RiTimeLine />
            <p>{`${time.hour} : ${
                time.minut.toString().length === 1
                    ? `0${time.minut}`
                    : time.minut
            } : ${
                time.second.toString().length === 1
                    ? `0${time.second}`
                    : time.second
            }`}</p>
        </TimeString>
    );
}

const TimeString = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;

    svg {
        font-size: 1.9rem;
        color: ${(p) => p.theme.secondary};
    }
    p {
        font-size: 1.9rem;
        color: ${(p) => p.theme.secondary};
        line-height: 1;
    }
`;
