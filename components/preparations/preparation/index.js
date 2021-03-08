import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../../store";
import { DateTime } from "luxon";
import Modal from "../../modals/modal_before_delete";
import {
    List,
    ListSmall,
    Note,
    RowNote,
    DeleteNote,
    Options,
    SendEmail,
} from "../../../styles";
import {
    RiCloseFill,
    RiCalendarEventLine,
    RiMailSendLine,
} from "react-icons/ri";

export default function PreparationComponent({ details, members }) {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    const listOfPreparations = JSON.parse(details.list);

    const [listOfMembers, renderListOfMembers] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);

    async function deleteList() {
        const res = await fetch(
            `/api/preparations/deleteList?id=${details.id}`
        );
        const data = await res.json();
        if (data.error) {
            return console.error(data.error);
        }
        dispatch({
            type: "updatePreparations",
            payload: data.preparations,
        });
        return router.push("/preparations");
    }

    return (
        <Note>
            <RowNote>
                <RiCalendarEventLine />{" "}
                <p>
                    {DateTime.fromObject({
                        day: parseInt(details.day),
                        month: parseInt(details.month),
                        year: parseInt(details.year),
                    }).toLocaleString(DateTime.DATE_FULL)}
                </p>
            </RowNote>
            <List border>
                {listOfPreparations.map((item, i) => {
                    return <li key={`${i}-${item}`}>{item}</li>;
                })}
            </List>
            <DeleteNote onClick={() => setDisplayModal(true)}>
                <RiCloseFill />
            </DeleteNote>
            <Options>
                <SendEmail
                    onClick={() =>
                        renderListOfMembers((prevState) => !prevState)
                    }
                >
                    <RiMailSendLine />
                </SendEmail>
            </Options>
            {listOfMembers && (
                <ListSmall border>
                    <p>Send this list as email to:</p>
                    {members.map((member, i) => {
                        return (
                            member.email && (
                                <li key={`${i}-${member}`}>
                                    {member.full_name}: {member.email}
                                </li>
                            )
                        );
                    })}
                </ListSmall>
            )}
            {displayModal && (
                <Modal
                    setModal={setDisplayModal}
                    deleteItem={deleteList}
                    message="Are you sure you want to delete this preparation list?"
                />
            )}
        </Note>
    );
}
