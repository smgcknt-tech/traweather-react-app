import React, { createContext, useReducer } from 'react'
const initialState = {
    resultData:[],
    currentPage: 0,
    selectedStock:null,
    posts: [],
    selectedPost:null,
    prediction:null
}
export const context = createContext(initialState)
export const actions = {
    SET_RESULT: 'SET_RESULT',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_SELECTED_STOCK: 'SET_SELECTED_STOCK',
    SET_POSTS: 'SET_POSTS',
    SET_SELECTED_POST: 'SET_SELECTED_POST',
    SET_PREDICTION: 'SET_PREDICTION'
}
export const ReflectionProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case actions.SET_RESULT:
                currentState.resultData = action.payload
                return currentState
            case actions.SET_CURRENT_PAGE:
                currentState.currentPage = action.payload
                return currentState
            case actions.SET_SELECTED_STOCK:
                currentState.selectedStock = action.payload
                return currentState
            case actions.SET_POSTS:
                currentState.posts = action.payload
                return currentState
            case actions.SET_SELECTED_POST:
                currentState.selectedPost = action.payload
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
