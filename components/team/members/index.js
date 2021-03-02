import { useContext } from "react";
import { Context } from "../../../store";
import TopRow from "./top_row";
import Member from "./single_member";
import { FlexCol } from "../../../styles";

export default function MembersComponent() {
    const { state } = useContext(Context);

    return (
        <FlexCol alignItems="stretch">
            <TopRow />

            {state.user.members.map((member, i) => {
                return (
                    <Member
                        member={member}
                        iteration={i}
                        key={`member-${member.full_name}-${i}`}
                    />
                );
            })}
        </FlexCol>
    );
}
