
import React, { useReducer } from 'react'
import { AppActions, AppContext, initialState } from '../AppStore';

//App test//
export const MockDispatch = jest.fn();
export const MockAppProvider = ({ children }) => {
    const [state] = useReducer((state, action) => {
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
    return <AppContext.Provider value={{ state, dispatch: MockDispatch }}>{children}</AppContext.Provider>
}