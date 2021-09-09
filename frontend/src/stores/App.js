import React, { createContext, useReducer } from 'react'
const initialState = {
    user: {
        id:null,
        name:null,
        status:true
    },
}
export const AppContext = createContext(initialState)
export const AppActions = {
    SET_USER: 'SET_USER',
}
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case AppActions.SET_USER:
                currentState.user = action.payload
                return currentState

            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
