import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Context } from "../../../store";
import Events from "./events";
import Recipes from "./recipes";
import Team from "./team";
import Preparations from "./preparations";
import { respond } from "../../../styles";

export default function GridComponent() {
    const {
        state: { user },
        dispatch,
    } = useContext(Context);

    return (
        <LandingGrid>
            <Link href="/events">
                <div>
                    <Events events={user.events} />
                </div>
            </Link>
            <Link href="/recipes">
                <div>
                    <Recipes recipes={user.recipes} />
                </div>
            </Link>
            <Link href="/team">
                <div>
                    <Team members={user.members} />
                </div>
            </Link>
            <Link href="/preparations">
                <div>
                    <Preparations preparations={user.preparations} />
                </div>
            </Link>
        </LandingGrid>
    );
}

const LandingGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: stretch;

    ${() =>
        respond(
            "l",
            "grid-template-columns: 1fr 1fr; grid-column-gap: 2.7rem;"
        )}
`;
