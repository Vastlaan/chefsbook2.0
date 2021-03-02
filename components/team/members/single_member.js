import { useState, useContext } from "react";
import Link from "next/link";
import { Context } from "../../../store";
import Modal from "../../modals/modal_before_delete";
import { FlexRow, Text2, Option, Edit, PlainButton } from "../../../styles";
import { RiDeleteBin2Line, RiEditLine } from "react-icons/ri";

export default function SingleMemberComponent({ member, iteration }) {
    const { state, dispatch } = useContext(Context);
    const [displayModal, setDisplayModal] = useState(false);

    async function deleteMember() {
        try {
            const res = await fetch(`/api/team/deleteMember?id=${member.id}`);
            const data = await res.json();
            console.log(data);
            if (data.error) {
                return console.error(data.error);
            }
            if (data.members) {
                return dispatch({
                    type: "updateMembers",
                    payload: data.members,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <FlexRow justify="space-between">
                <Text2>
                    {iteration + 1}. {member.full_name}
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
            {displayModal && (
                <Modal
                    setModal={setDisplayModal}
                    deleteItem={deleteMember}
                    message={`Are you sure you want to delete member ${member.full_name}?`}
                />
            )}
        </>
    );
}
