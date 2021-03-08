import styled from "styled-components";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../../store";
import ModalBeforeDelete from "../modals/modal_before_delete";
import addZero from "../../utils/addZeroToUnit";
import { PlainButton, Note, RowNote, DeleteNote } from "../../styles";
import { RiTimeLine, RiCloseFill, RiCalendarEventLine } from "react-icons/ri";

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
        router.push(`/events`);
    }

    return (
        <Note key={hour + minute}>
            {date && (
                <RowNote>
                    <RiCalendarEventLine />{" "}
                    <p>
                        {DateTime.fromObject({
                            day: parseInt(date.day),
                            month: parseInt(date.month),
                            year: parseInt(date.year),
                        }).toLocaleString(DateTime.DATE_FULL)}
                    </p>
                </RowNote>
            )}
            <RowNote>
                <RiTimeLine />
                <p>
                    {`${addZero(hour)}
                    :${addZero(minute)}`}
                </p>
            </RowNote>
            <Description>
                <p>{description}</p>
            </Description>
            <DeleteNote onClick={() => setDisplayQuestion(true)}>
                <RiCloseFill />
            </DeleteNote>
            {displayQuestion && (
                <ModalBeforeDelete
                    setModal={setDisplayQuestion}
                    deleteItem={deleteEvent}
                    message="Are you sure you want to delete this event?"
                />
            )}
        </Note>
    );
}

const Description = styled.div`
    display: flex;
    margin-top: 0.7rem;
    p {
        color: ${(p) => p.theme.white};
        font-size: 1.9rem;
    }
`;
