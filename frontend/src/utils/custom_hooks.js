import axios from "axios";
import { useEffect, useMemo } from "react";
import { helper } from "./helper";


export const hooks = {
    useAuthentification: (user, dispatch, AppActions) => {
        useEffect(() => {
            if (user.status === true) {
                axios.get('/user/auth', {
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                }).then((res) => {
                    dispatch({
                        type: AppActions.SET_USER, payload: {
                            id: res.data.id,
                            name: res.data.username,
                            status: true,
                        }
                    });
                }).catch((err) => {
                    localStorage.removeItem('access_token')
                    dispatch({ type: AppActions.SET_USER, payload: { ...user, status: false } })
                })
            }
        }, [user.status])
    },
    useFetchPlanPageData: (AppState, state, dispatch, actions) => {
        useEffect(() => {
            if (AppState.user.id) {
                helper.fecthData(`/api/fetch_latest_stock`, dispatch, actions)
                    .then((data) => { dispatch({ type: actions.SET_ALL_STOCKS, payload: data }); })
                helper.fecthData(`/api/fetch_plan/${AppState.user.id}`, dispatch, actions)
                    .then((data) => {
                        dispatch({ type: actions.SET_PLAN, payload: data });
                        if (!state.selectedStock && data) {
                            dispatch({ type: actions.SET_SELECTED_STOCK, payload: data[0] })
                        }
                    });
                helper.fecthData(`/api/fetch_todays_prediction/${helper.get_today()}`, dispatch, actions)
                    .then((data) => {
                        dispatch({ type: actions.SET_PREDICTION, payload: data });
                    });
            }
        }, [AppState.user.id, state.planData.length ]);


        const indicatorsData = useMemo(() => {
            if (!state.selectedStock && state.planData?.length) {
                return state.allStocks?.find((stock) => state.planData[0].code === Number(stock.code))
            }
            if (state.selectedStock && state.planData?.length) {
                return state.allStocks?.find((stock) => state.selectedStock.code === Number(stock.code))
            }
        }, [state.selectedStock, state.allStocks, state.planData])

        useEffect(() => {
            if (!state.selectedStock && indicatorsData) {
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: state.planData[0] })
                dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
            }
            if (state.selectedStock && indicatorsData) {
                dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
            }
        }, [indicatorsData, state.planData]);
    }


};