import React, { createContext, useReducer } from 'react'
const initialState = {
    auth:false,
    user: {
        id:null,
        name:null,
    },
}
export const AppContext = createContext(initialState)
export const AppActions = {
    SET_AUTH:'SET_AUTH',
    SET_USER: 'SET_USER',
}
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case AppActions.SET_AUTH:
                currentState.auth = action.payload
                return currentState
            case AppActions.SET_USER:
                currentState.user = {
                    id:action.payload.id,
                    name: action.payload.username,
                }
                return currentState

            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
