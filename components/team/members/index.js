import { useContext } from "react";
import { Context } from "../../../store";
import TopRow from "./top_row";
import Member from "./single_member";
import { FlexCol, Text3, Line } from "../../../styles";

export default function MembersComponent() {
    const { state } = useContext(Context);

    return (
        <FlexCol alignItems="stretch" margin="0 0 1.4rem 0">
            <TopRow />
            <Line />
            {state.user.members.length > 0 ? (
                state.user.members.map((member, i) => {
                    return (
                        <Member
                            member={member}
                            iteration={i}
                            key={`member-${member.full_name}-${i}`}
                        />
                    );
                })
            ) : (
                <Text3 wide>
                    You haven't added anyone to your team yet. Click button
                    above to Add New Member.
                </Text3>
            )}
        </FlexCol>
    );
}
