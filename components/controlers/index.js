import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../store";
import { BigText, Text2, Line } from "../../styles";
import {
    RiAddLine,
    RiCalendarEventLine,
    RiTeamLine,
    RiSettings5Line,
} from "react-icons/ri";
import { FaRegEdit, FaRegListAlt } from "react-icons/fa";

export default function ControlersComponent() {
    const { state } = useContext(Context);
    const user = state.user;

    return (
        <Controlers>
            <BigText>{user.email}</BigText>
            <Line />
            <Subject>
                <RiAddLine />
                <Text2>Add Post</Text2>
            </Subject>
            <Subject>
                <RiCalendarEventLine />
                <Text2>Events</Text2>
            </Subject>
            <Subject>
                <FaRegEdit />
                <Text2>Recipes</Text2>
            </Subject>
            <Subject>
                <RiTeamLine />
                <Text2>My Team</Text2>
            </Subject>
            <Subject>
                <FaRegListAlt />
                <Text2>Preparation List</Text2>
            </Subject>
            <Subject>
                <RiSettings5Line />
                <Text2>Settings</Text2>
            </Subject>
        </Controlers>
    );
}

const Controlers = styled.div`
    background-color: ${(p) => p.theme.black};
    display: flex;
    flex-direction: column;
    padding: 2.7rem 1.4rem;
    border-radius: 5px;
`;
const Subject = styled.div`
    display: flex;
    align-items: center;
    margin: 1.4rem 0;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    transition: all 0.3s;

    svg {
        margin-right: 1.4rem;
        font-size: 2.2rem;
        color: ${(p) => p.theme.grey2};
    }

    &:hover {
        border-bottom: 1px solid ${(p) => p.theme.grey2};
    }
`;
