import { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";
import { BigText, FlexRow, ButtonPrimary, ButtonSecondary } from "../../styles";

export default function ModalBeforeDelete({ setModal, deleteItem, message }) {
    useEffect(() => {
        gsap.to(modal.current, { autoAlpha: 1, scale: 1, duration: 0.6 });

        return () =>
            gsap.to(modal.current, { autoAlpha: 0, scale: 0.3, duration: 0.6 });
    });

    const modal = useRef();
    return (
        <Modal ref={modal}>
            <BigText>{message}</BigText>
            <FlexRow>
                <ButtonPrimary
                    onClick={() => {
                        setModal(false);
                        deleteItem();
                    }}
                >
                    Delete
                </ButtonPrimary>
                <ButtonSecondary
                    onClick={() => {
                        setModal(false);
                    }}
                >
                    Cancel
                </ButtonSecondary>
            </FlexRow>
        </Modal>
    );
}
const Modal = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.3);

    button {
        margin: 1.4rem;
    }
`;
