import '../../src/styles/pages/PlanPage.scss'
import React, { useContext, useEffect, useMemo } from 'react'
import { context, actions } from '../stores/PlanPage'
import { helper } from '../utils/helper';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';
import Prediction from '../components/Prediction';

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const { selectedStock, allStocks, planData, prediction, loading, error } = state
    useEffect(() => {
        helper.fecthData(`/api/fetch_latest_stock`, dispatch, actions)
            .then((data) => { dispatch({ type: actions.SET_ALL_STOCKS, payload: data }); })
        helper.fecthData(`/api/fetch_plan`, dispatch, actions)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                if (!selectedStock && data) {
                    dispatch({ type: actions.SET_SELECTED_STOCK, payload: data[0] })
                }
            });
        helper.fecthData(`/api/fetch_todays_prediction/${helper.get_today()}`, dispatch, actions)
                    .then((data) => {
                        dispatch({ type: actions.SET_PREDICTION, payload: data });
                    });
    }, []);


    const indicatorsData = useMemo(() => {
        if (!selectedStock && planData.length) {
            return allStocks?.find((stock) => planData[0].code === Number(stock.code))
        }
        if (selectedStock && planData.length){
            return allStocks?.find((stock) => selectedStock.code === Number(stock.code))
        }
    }, [selectedStock,allStocks,planData])

    useEffect(() => {
        if (!selectedStock && indicatorsData) {
            dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[0] })
            dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
        }
        if (selectedStock && indicatorsData) {
            dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
        }
    }, [indicatorsData]);

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="plan_page">
            <SearchBar />
            <div className="dashboard">
                <div className="left">
                    <StoryTable />
                    <StoryChart />
                </div>
                <div className="right">
                    <Reason />
                    <Strategy />
                </div>
            </div>
            {prediction && <Prediction/>}
        </div>
    )
}
