import React, { createContext, useReducer } from 'react'
const initialState = {
    loading: false,
    error: false,
    planData: [],
    selectedStock:null,
    indicators: null,
    prediction: null,
    currentPage:0,
}
export const context = createContext(initialState)
export const actions = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_SELECTED_STOCK: 'SET_SELECTED_STOCK',
    SET_INDICATORS: 'SET_INDICATORS',
    SET_PLAN: 'SET_PLAN',
    SET_PREDICTION: 'SET_PREDICTION',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
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
            case actions.SET_CURRENT_PAGE:
                currentState.currentPage = action.payload
                return currentState
            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
}
