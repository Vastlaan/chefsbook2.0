import styled from "styled-components";
import { HOURS } from "../../../../utils/hours";
import { MINUTES } from "../../../../utils/minutes";
import { Field, FlexRow } from "../../../../styles";

export default function TimeComponent({ setHour, setMinute, errors }) {
    function filterFirstZero(string) {
        if (string.charAt(0) === "0") {
            return string.charAt(1);
        }
        return string;
    }
    return (
        <Field>
            <label>Pick up the time:</label>
            <FlexRow>
                <CustomSelect>
                    <span>H:</span>
                    <select
                        name="hour"
                        id="hour"
                        onChange={(e) => {
                            setHour(filterFirstZero(e.target.value));
                        }}
                    >
                        {HOURS.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </CustomSelect>

                <CustomSelect>
                    <span>M:</span>
                    <select
                        name="minute"
                        id="minute"
                        onChange={(e) =>
                            setMinute(filterFirstZero(e.target.value))
                        }
                    >
                        {MINUTES.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </CustomSelect>
            </FlexRow>
            {errors.field === "time" && <small>{errors.message}</small>}
        </Field>
    );
}

const CustomSelect = styled.div`
    display: flex;
    align-items: center;

    span {
        font-size: 1.9rem;
        color: ${(p) => p.theme.secondary};
    }

    select {
        margin: 0 1.4rem;
        border: 1px solid ${(p) => p.theme.secondary};
        border-radius: 5px;
        background-color: transparent;
        padding: 0.7rem 1.4rem;
        color: ${(p) => p.theme.secondary};
        font-size: 1.6rem;

        &:active,
        :focus {
            outline: none;
        }

        option {
            font-size: 1.6rem;
            color: ${(p) => p.theme.secondary};
        }
    }
`;
