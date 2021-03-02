import { useContext, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Context } from "../../../store";
import {
    FlexRow,
    BigText,
    Text2,
    ButtonPrimary,
    FlexCol,
    Option,
    Edit,
    PlainButton,
} from "../../../styles";
import { RiAddLine, RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

export default function MembersComponent() {
    const { state } = useContext(Context);
    const [displayModal, setDisplayModal] = useState(false);

    console.log(state.user);

    return (
        <FlexCol alignItems="stretch">
            <TopRowWide>
                <BigText>Members:</BigText>

                <Link href="/team/createMember">
                    <ButtonPrimary>
                        <RiAddLine />
                        Add New Member
                    </ButtonPrimary>
                </Link>
            </TopRowWide>

            {state.user.members.map((member, i) => {
                return (
                    <FlexRow
                        justify="space-between"
                        key={`member-${member.full_name}-${i}`}
                    >
                        <Text2>
                            {i + 1}. {member.full_name}
                        </Text2>
                        <FlexRow>
                            <PlainButton>
                                <Link href={`/team/edit/${member.id}`}>
                                    <Edit>
                                        <RiEditLine />
                                    </Edit>
                                </Link>
                            </PlainButton>
                            <PlainButton onClick={() => setDisplayModal(true)}>
                                <Option>
                                    <RiDeleteBin2Line />
                                </Option>
                            </PlainButton>
                        </FlexRow>
                    </FlexRow>
                );
            })}
        </FlexCol>
    );
}
const TopRowWide = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
