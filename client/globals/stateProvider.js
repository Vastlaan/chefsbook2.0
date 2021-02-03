import React, { useReducer } from "react";
import { initialState, reducer, Context } from "../store";

function StateProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}

export default StateProvider;
