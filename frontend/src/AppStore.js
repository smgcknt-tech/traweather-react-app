import React, { createContext, useReducer } from 'react';
export const initialState = {
    user: {
        id: null,
        name: null,
        status: true
    },
    allStocks: null,
    prediction: null,
    loading: false,
    error: false,
    planData: [],
    selectedStock: null,
    indicators: null,
    currentPage: 0,
    resultData: [],
    resultIndicators: {
        stockData: null,
        monthly_profit: 0,
        last_profit: 0,
        todays_profit: 0,
        weekly_profit:0,
        win_lose:{
            monthly_win:0,
            monthly_lose:0,
        }
    },
    posts: [],
    selectedPost: null,
    heatmapData:null,
};
export const AppContext = createContext(initialState);
export const AppActions = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_USER: 'SET_USER',
    SET_ALL_STOCKS: 'SET_ALL_STOCKS',
    SET_PREDICTION: 'SET_PREDICTION',
    SET_SELECTED_STOCK: 'SET_SELECTED_STOCK',
    SET_INDICATORS: 'SET_INDICATORS',
    SET_PLAN: 'SET_PLAN',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_RESULT: 'SET_RESULT',
    SET_RESULT_INDICATORS: 'SET_RESULT_INDICATORS',
    SET_POSTS: 'SET_POSTS',
    SET_SELECTED_POST: 'SET_SELECTED_POST',
    SET_HEAT_MAP: 'SET_HEAT_MAP',
};
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const currentState = { ...state };
        switch (action.type) {
            case AppActions.SET_USER:
                currentState.user = action.payload;
                return currentState;
            case AppActions.SET_PREDICTION:
                currentState.prediction = action.payload;
                return currentState;
            case AppActions.SET_ALL_STOCKS:
                currentState.allStocks = action.payload;
                return currentState;
            case AppActions.SET_LOADING:
                currentState.loading = action.payload;
                return currentState;
            case AppActions.SET_ERROR:
                currentState.error = action.payload;
                return currentState;
            case AppActions.SET_SELECTED_STOCK:
                currentState.selectedStock = action.payload;
                return currentState;
            case AppActions.SET_INDICATORS:
                currentState.indicators = action.payload;
                return currentState;
            case AppActions.SET_PLAN:
                currentState.planData = action.payload;
                return currentState;
            case AppActions.SET_CURRENT_PAGE:
                currentState.currentPage = action.payload;
                return currentState;
            case AppActions.SET_RESULT:
                currentState.resultData = action.payload;
                return currentState;
            case AppActions.SET_RESULT_INDICATORS:
                currentState.resultIndicators = action.payload;
                return currentState;
            case AppActions.SET_POSTS:
                currentState.posts = action.payload;
                return currentState;
            case AppActions.SET_SELECTED_POST:
                currentState.selectedPost = action.payload;
                return currentState;
            case AppActions.SET_HEAT_MAP:
                currentState.heatmapData = action.payload;
                return currentState;
            default:
                throw new Error('no action matched');
        }
    }, initialState);
    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
