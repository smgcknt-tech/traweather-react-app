import React, { createContext, useReducer } from 'react'
const initialState = {
    allStocks: null,
    planData: null,
    selectedStock: null,
    indicators: null,
}
export const context = createContext(initialState)
export const actions = {
    SET_ALL_STOCKS: 'SET_ALL_STOCKS',
    SET_SELECTED_STOCK: 'SET_SELECTED_STOCK',
    SET_INDICATORS: 'SET_INDICATORS',
    SET_PLAN: 'SET_PLAN'
}
export const PlanProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
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
            default:
                throw new Error()
        }
    }, initialState)
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
}
