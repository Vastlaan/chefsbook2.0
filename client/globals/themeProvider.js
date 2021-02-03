import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles";
import { Context } from "../store";

export default function ThemePrv({ children }) {
    const { state } = useContext(Context);
    return (
        <ThemeProvider
            theme={state.colorTheme === "light" ? lightTheme : darkTheme}
        >
            {children}
        </ThemeProvider>
    );
}
