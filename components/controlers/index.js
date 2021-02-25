import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Context } from "../../store";
import { respond, BigText, Text2, Line } from "../../styles";
import {
    RiAddLine,
    RiCalendarEventLine,
    RiTeamLine,
    RiSettings5Line,
    RiMessage2Line,
} from "react-icons/ri";
import { FaRegEdit, FaRegListAlt } from "react-icons/fa";

export default function ControlersComponent() {
    const [isSmall, setIsSmall] = useState(false);
    const { state } = useContext(Context);
    const user = state.user;

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSmall(true);
        } else {
            setIsSmall(false);
        }
        function resize() {
            if (window.innerWidth < 768) {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        }
        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <Controlers>
            {!isSmall && (
                <div>
                    <Link href="/">
                        <BigText cursor="pointer">{user.email}</BigText>
                    </Link>

                    <Line />
                </div>
            )}

            <Link href="/posts">
                <Subject>
                    <RiMessage2Line />
                    <Text2>My Posts</Text2>
                </Subject>
            </Link>
            <Link href="/events">
                <Subject>
                    <RiCalendarEventLine />
                    <Text2>Events</Text2>
                </Subject>
            </Link>
            <Link href="/recipes">
                <Subject>
                    <FaRegEdit />
                    <Text2>Recipes</Text2>
                </Subject>
            </Link>
            <Subject>
                <RiTeamLine />
                <Text2>My Team</Text2>
            </Subject>
            <Subject>
                <FaRegListAlt />
                <Text2>Preparation List</Text2>
            </Subject>
            <Link href="/user/settings">
                <Subject>
                    <RiSettings5Line />
                    <Text2>Settings</Text2>
                </Subject>
            </Link>
        </Controlers>
    );
}

const Controlers = styled.div`
    background-color: ${(p) => p.theme.black};
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 1rem;
    z-index: 98;

    ${() =>
        respond(
            "m",
            `
            padding: 0;
            position: sticky;
            top: 0;
            left: unset;
            flex-direction: column;
            padding: 2.7rem 1.4rem;
            border-radius: 5px;
            align-self: start;
        `
        )}
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
        font-size: 3.3rem;
        color: ${(p) => p.theme.secondary};

        ${(p) => respond("m", `font-size: 2.2rem; color: ${p.theme.grey2};`)}
    }
    p {
        display: none;
        ${() => respond("m", ` display: inline-block;`)}
    }
    &:hover {
        ${(p) => respond("m", ` border-bottom: 1px solid ${p.theme.grey2}; `)}
    }
`;
