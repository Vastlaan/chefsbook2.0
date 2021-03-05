import { createContext } from "react";

export const initialState = {
    user: {
        recipes: [],
        events: [],
        posts: [],
        preparations: [],
        members: [],
    },
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
            return { ...state, isLogged: false, user: initialState.user };
        case "setPosts":
            return { ...state, user: { ...state.user, posts: action.payload } };
        case "setRecipes":
            return {
                ...state,
                user: { ...state.user, recipes: action.payload },
            };
        case "updatePosts":
            return {
                ...state,
                user: {
                    ...state.user,
                    posts: [action.payload, ...state.user.posts],
                },
            };
        case "updateSinglePost":
            const filteredPosts = state.user.posts.filter(
                (p) => p.id !== action.payload.id
            );

            return {
                ...state,
                user: {
                    ...state.user,
                    posts: [action.payload, ...filteredPosts],
                },
            };
        case "updateRecipes":
            return {
                ...state,
                user: {
                    ...state.user,
                    recipes: action.payload,
                },
            };
        case "updateUser":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        case "updateEvents":
            return {
                ...state,
                user: {
                    ...state.user,
                    events: action.payload,
                },
            };
        case "updateCreatedEvent":
            return {
                ...state,
                user: {
                    ...state.user,
                    events: [action.payload, ...state.user.events],
                },
            };
        case "updateMembers":
            return {
                ...state,
                user: {
                    ...state.user,
                    members: action.payload,
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
