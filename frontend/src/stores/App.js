import React, { createContext, useReducer } from 'react'
export const initialState = {
    user: {
        id:null,
        name:null,
        status:true
    },
    allStocks: null,
    prediction: null,
    loading: false,
    error: false,
}
export const AppContext = createContext(initialState)
export const AppActions = {
    SET_USER: 'SET_USER',
    SET_ALL_STOCKS: 'SET_ALL_STOCKS',
    SET_PREDICTION: 'SET_PREDICTION',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
}
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case AppActions.SET_USER:
                currentState.user = action.payload
                return currentState
            case AppActions.SET_PREDICTION:
                currentState.prediction = action.payload
                return currentState
            case AppActions.SET_ALL_STOCKS:
                currentState.allStocks = action.payload
                return currentState
            case AppActions.SET_LOADING:
                currentState.loading = action.payload
                return currentState
            case AppActions.SET_ERROR:
                currentState.error = action.payload
                return currentState
            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
