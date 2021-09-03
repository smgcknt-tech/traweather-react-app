import '../../src/styles/pages/PlanPage.scss'
import React, { memo, useContext, useEffect } from 'react'
import { context, actions } from '../stores/PlanPage'
import { helper } from '../utils/helper';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const { selectedStock, allStocks, planData,loading, error } = state
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
    }, []);

    useEffect(() => {
        if (!selectedStock && planData.length && allStocks){
            dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[0] })
            const indicators = allStocks.find((stock) => planData[0].code === Number(stock.code))
            dispatch({ type: actions.SET_INDICATORS, payload: indicators });
        }
        if (selectedStock && planData.length && allStocks) {
            const indicators = allStocks.find((stock)=> selectedStock.code === Number(stock.code) )
            dispatch({ type: actions.SET_INDICATORS, payload: indicators });
            
        }
    }, [selectedStock, allStocks, planData]);

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="planPage">
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
        </div>
    )
}
