import { useState } from "react";
import addZeroToUnit from "../../../utils/addZeroToUnit";
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
    const listOfPreparations = JSON.parse(details.list);

    const [listOfMembers, renderListOfMembers] = useState(false);

    return (
        <Note>
            <RowNote>
                <RiCalendarEventLine />{" "}
                <p>
                    {`${addZeroToUnit(details.day)}
                    -${addZeroToUnit(details.month)}
                    -${details.year}`}
                </p>
            </RowNote>
            <List border>
                {listOfPreparations.map((item, i) => {
                    return <li key={`${i}-${item}`}>{item}</li>;
                })}
            </List>
            <DeleteNote>
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
        </Note>
    );
}
