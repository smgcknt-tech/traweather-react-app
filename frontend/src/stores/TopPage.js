import React, { createContext, useReducer } from 'react'
const initialState = {

}
export const context = createContext(initialState)
export const actions = {


}
export const TopProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state }; // eslint-disable-line
        switch (action.type) {

            default:
                throw new Error('no action matched')
        }
    }, initialState)
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
}
