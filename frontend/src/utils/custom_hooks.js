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
        const { user } = AppState;
        const { selectedStock, planData, allStocks } = state;

        useEffect(() => {
            console.log(helper.get_today())
            if (user.id) {
                helper.fecthData(`/api/fetch_plan`, dispatch, actions, { user_id: user.id })
                    .then((fetchedPlan) => {
                        dispatch({ type: actions.SET_PLAN, payload: fetchedPlan });
                        if (!selectedStock && fetchedPlan.length > 0) {
                            dispatch({ type: actions.SET_SELECTED_STOCK, payload: fetchedPlan[0] })
                        }
                    });
                helper.fecthData(`/api/fetch_one_prediction`, dispatch, actions, {
                    user_id: user.id,
                    date: helper.get_today()
                }).then((data) => {

                        dispatch({ type: actions.SET_PREDICTION, payload: data });
                    });
                helper.fecthData(`/api/fetch_latest_stock`, dispatch, actions)
                    .then((fecthedStocks) => { dispatch({ type: actions.SET_ALL_STOCKS, payload: fecthedStocks }); })
            }
        }, [user.id]);

        const indicatorsData = useMemo(() => {
            if (allStocks) {
                if (!selectedStock && planData.length > 0) {
                    return allStocks.find((stock) => planData[0].code === Number(stock.code))
                } else if (selectedStock) {
                    return allStocks.find((stock) => selectedStock.code === Number(stock.code))
                }
            }
        }, [selectedStock, planData, allStocks])

        useEffect(() => {
            if (!selectedStock && planData.length > 0) {
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[0] })
                dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
            } else if (selectedStock) {
                dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
            }
        }, [indicatorsData, selectedStock]);
    }


};