import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../../store";
import { DateTime } from "luxon";
import ModalDelete from "../../modals/modal_before_delete";
import ModalSendEmail from "../../modals/send_email";
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
    const [displayModalDelete, setDisplayModalDelete] = useState(false);
    const [displayModalSendEmail, setDisplayModalSendEmail] = useState(false);

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

    function createLocalDateString(day, month, year) {
        return DateTime.fromObject({
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
        }).toLocaleString(DateTime.DATE_FULL);
    }

    function arrayToString(array) {
        let templateString = ``;
        array.map((item) => (templateString = `${templateString} ${item},`));
        return templateString;
    }

    return (
        <Note>
            <RowNote>
                <RiCalendarEventLine />{" "}
                <p>
                    {createLocalDateString(
                        details.day,
                        details.month,
                        details.year
                    )}
                </p>
            </RowNote>
            <List border>
                {listOfPreparations.map((item, i) => {
                    return <li key={`${i}-${item}`}>{item}</li>;
                })}
            </List>
            <DeleteNote onClick={() => setDisplayModalDelete(true)}>
                <RiCloseFill />
            </DeleteNote>
            <Options>
                <SendEmail onClick={() => setDisplayModalSendEmail(true)}>
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
            {displayModalDelete && (
                <ModalDelete
                    setModal={setDisplayModalDelete}
                    deleteItem={deleteList}
                    message="Are you sure you want to delete this preparation list?"
                />
            )}
            {displayModalSendEmail && (
                <ModalSendEmail
                    setModal={setDisplayModalSendEmail}
                    title={`Preparation list for: ${createLocalDateString(
                        details.day,
                        details.month,
                        details.year
                    )}`}
                    body={`Hey guys!
Please don't forget about this tasks:
${arrayToString(listOfPreparations)}`}
                />
            )}
        </Note>
    );
}
