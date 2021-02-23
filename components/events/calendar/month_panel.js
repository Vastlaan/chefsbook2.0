import styled, { withTheme } from "styled-components";
import { PlainButton, Heading6 } from "../../../styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function MonthPanelComponent(props) {
    const { startDate, setStartDate } = props;

    return (
        <Month>
            <PlainButton
                onClick={() => setStartDate(startDate.minus({ month: 1 }))}
            >
                <RiArrowLeftSLine />
            </PlainButton>
            <div>
                <Heading6 color={props.theme.black}>
                    {startDate.monthLong} {startDate.year}
                </Heading6>
            </div>
            <PlainButton
                onClick={() => setStartDate(startDate.plus({ month: 1 }))}
            >
                <RiArrowRightSLine />
            </PlainButton>
        </Month>
    );
}
export default withTheme(MonthPanelComponent);

const Month = styled.div`
    grid-column: 1/-1;
    display: flex;
    background-color: ${(p) => p.theme.primary};

    button {
        padding: 1.4rem 2.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;

        svg {
            color: ${(p) => p.theme.black};
        }
    }
    div {
        padding: 1.4rem 2.7rem;
        margin: 0 auto;

        h3 {
        }
    }
`;
