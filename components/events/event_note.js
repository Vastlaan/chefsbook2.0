import styled from "styled-components";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../../store";
import { PlainButton } from "../../styles";
import { RiTimeLine, RiCloseFill } from "react-icons/ri";

export default function EventNoteComponent({
    date,
    minute,
    hour,
    description,
    id,
}) {
    const { state, dispatch } = useContext(Context);
    const [displayQuestion, setDisplayQuestion] = useState(false);

    const router = useRouter();

    async function deleteEvent() {
        const res = await fetch(`/api/events/deleteEvent?id=${id}`);
        const data = await res.json();
        dispatch({ type: "updateEvents", payload: data.events });
        // return router.reload();
    }

    return (
        <EventNote key={hour + minute}>
            {date && (
                <Date>
                    Date:{" "}
                    {` ${date.day.length === 1 ? `0${date.day}` : date.day}-${
                        date.month.length === 1 ? `0${date.month}` : date.month
                    }-${date.year}`}
                </Date>
            )}
            <Time>
                <RiTimeLine />
                <p>
                    {`${hour.length === 1 ? `0${hour}` : hour}:${
                        minute.length === 1 ? `0${minute}` : minute
                    }`}
                </p>
            </Time>
            <Description>
                <p>{description}</p>
            </Description>
            <DeleteEvent onClick={() => setDisplayQuestion(true)}>
                <RiCloseFill />
            </DeleteEvent>
            {displayQuestion && (
                <CustomDeleteComponent>
                    <button
                        onClick={() => {
                            setDisplayQuestion(false);
                            deleteEvent();
                        }}
                    >
                        yes
                    </button>
                    <button
                        onClick={() => {
                            setDisplayQuestion(false);
                        }}
                    >
                        no
                    </button>
                </CustomDeleteComponent>
            )}
        </EventNote>
    );
}
const EventNote = styled.div`
    min-width: 35rem;
    padding: 1.4rem;
    margin: 1.4rem;
    display: flex;
    flex-direction: column;
    background-color: ${(p) => p.theme.secondary};
    border-radius: 5px;
    transition: all 0.3s;
    position: relative;
`;
const Date = styled.div`
    display: flex;
    color: ${(p) => p.theme.white};
    font-size: 1.9rem;
`;
const Time = styled.div`
    display: flex;
    align-items: center;

    p {
        color: ${(p) => p.theme.white};
        font-size: 1.9rem;
    }
    svg {
        color: ${(p) => p.theme.white};
        font-size: 1.9rem;
        margin-right: 1.4rem;
    }
`;
const Description = styled.div`
    display: flex;
    margin-top: 0.7rem;
    p {
        color: ${(p) => p.theme.white};
        font-size: 1.9rem;
    }
`;
const DeleteEvent = styled(PlainButton)`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.7rem;

    svg {
        color: ${(p) => p.theme.white};
    }
`;
const CustomDeleteComponent = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    backgound-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
`;
