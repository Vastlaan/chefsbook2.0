import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Modal from "../modals/modal_before_delete";
import { FlexCol, BigText } from "../../styles";

export default function DangerZoneComponent() {
    const router = useRouter();

    const [displayModal, setDisplayModal] = useState(false);

    async function deleteAccount() {
        try {
            const res = await fetch("/api/auth/deleteAccount");

            const data = await res.json();

            if (data.error) {
                console.error(data.error);
            }
            return (window.location.href = "/");
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <FlexCol>
            <BigText color="orangered">Danger Zone</BigText>
            <ButtonDelete onClick={() => setDisplayModal(true)}>
                Delete Account
            </ButtonDelete>

            {displayModal && (
                <Modal
                    setModal={setDisplayModal}
                    deleteItem={deleteAccount}
                    message="This is irreversible action and it will delete all your data. Are you sure you want to delete your account?"
                />
            )}
        </FlexCol>
    );
}

const ButtonDelete = styled.button`
    padding: 0.9rem 2.2rem;
    background-color: #d94044;
    font-size: 1.9rem;
    color: ${(p) => p.theme.white};
    overflow: hidden;
`;
