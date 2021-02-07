import React, { createContext } from "react";

export const initialState = {
    user: {},
    colorTheme: "light",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "setUser":
            return { ...state, user: action.payload };
        case "unsetUser":
            return { ...state, user: {} };
        case "setDarkTheme":
            return { ...state, colorTheme: "dark" };
        case "setLightTheme":
            return { ...state, colorTheme: "light" };
        default:
            return { ...state };
    }
};

export const Context = createContext();
