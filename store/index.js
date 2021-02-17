import { createContext } from "react";

export const initialState = {
    user: {},
    isLogged: "pending",
    colorTheme: "light",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "setUser":
            return { ...state, user: action.payload };
        case "isLogged":
            return { ...state, isLogged: action.payload };
        case "logout":
            return { ...state, isLogged: false, user: {} };
        case "setPosts":
            return { ...state, user: { ...state.user, posts: action.payload } };
        case "updatePosts":
            return {
                ...state,
                user: {
                    ...state.user,
                    posts: [action.payload, ...state.user.posts],
                },
            };
        case "updateRecipe":
            return {
                ...state,
                user: {
                    ...state.user,
                    recipes: [action.payload, ...state.user.recipes],
                },
            };
        case "setDarkTheme":
            return { ...state, colorTheme: "dark" };
        case "setLightTheme":
            return { ...state, colorTheme: "light" };
        default:
            return { ...state };
    }
};

export const Context = createContext();
