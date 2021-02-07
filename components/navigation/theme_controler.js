import React, { useContext } from "react";
import styled from "styled-components";
import { PlainButton } from "../../styles";
import { RiSunFoggyFill } from "react-icons/ri";
import { GiMoonBats } from "react-icons/gi";
import { Context } from "../../store";

export default function ThemeControlerComponent() {
    const { state, dispatch } = useContext(Context);

    return (
        <ThemeControlers>
            {state.colorTheme === "dark" ? (
                <PlainButton
                    onClick={() => dispatch({ type: "setLightTheme" })}
                >
                    <RiSunFoggyFill />
                </PlainButton>
            ) : (
                <PlainButton onClick={() => dispatch({ type: "setDarkTheme" })}>
                    <GiMoonBats />
                </PlainButton>
            )}
        </ThemeControlers>
    );
}
const ThemeControlers = styled.div`
    display: flex;
    align-items: center;
`;
