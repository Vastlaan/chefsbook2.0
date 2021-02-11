import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Context } from "../../store";
import { PlainButton } from "../../styles";
import { RiLogoutBoxRLine, RiUserSettingsLine } from "react-icons/ri";

export default function UserControlersComponent() {
    const { state, dispatch } = useContext(Context);

    if (!state.user) {
        return null;
    }
    if (!state.user.email) {
        return null;
    }
    return (
        <UserControlers>
            <Link href="/">
                <PlainButton>
                    <RiUserSettingsLine />
                </PlainButton>
            </Link>
            <PlainButton
                onClick={() => {
                    fetch("/api/logout").then((res) => {
                        dispatch({ type: "logout" });
                        console.log("logged out has been called");
                        dispatch({ type: "isLogged", payload: false });
                    });
                }}
            >
                <RiLogoutBoxRLine />
            </PlainButton>
        </UserControlers>
    );
}
const UserControlers = styled.div`
    margin-left: 2.7rem;
    display: flex;
    align-items: center;

    & > * {
        margin-right: 1.4rem;
    }
`;
