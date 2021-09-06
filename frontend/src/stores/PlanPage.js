import React, { createContext, useReducer } from 'react'
const initialState = {
    loading: false,
    error: false,
    allStocks: null,
    planData: [],
    selectedStock:null,
    indicators: null,
    prediction: null,
}
export const context = createContext(initialState)
export const actions = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_ALL_STOCKS: 'SET_ALL_STOCKS',
    SET_SELECTED_STOCK: 'SET_SELECTED_STOCK',
    SET_INDICATORS: 'SET_INDICATORS',
    SET_PLAN: 'SET_PLAN',
    SET_PREDICTION: 'SET_PREDICTION',
}
export const PlanProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case actions.SET_LOADING:
                currentState.loading = action.payload
                return currentState
            case actions.SET_ERROR:
                currentState.error = action.payload
                return currentState
            case actions.SET_ALL_STOCKS:
                currentState.allStocks = action.payload
                return currentState
            case actions.SET_SELECTED_STOCK:
                currentState.selectedStock = action.payload
                return currentState
            case actions.SET_INDICATORS:
                currentState.indicators = action.payload
                return currentState
            case actions.SET_PLAN:
                currentState.planData = action.payload
                return currentState
            case actions.SET_PREDICTION:
                currentState.prediction = action.payload
                return currentState
            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
}
