import React, { createContext, useReducer } from 'react'
const initialState = {
    loading: false,
    error: false,
}
export const context = createContext(initialState)
export const actions = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
}
export const TopProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case actions.SET_LOADING:
                currentState.loading = action.payload
                return currentState
            case actions.SET_ERROR:
                currentState.error = action.payload
                return currentState
            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
}
