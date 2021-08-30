import axios from 'axios';
import React, {useContext, useEffect } from 'react'
import { context, actions } from '../stores/PlanPage'
import { hook } from '../utils/custom_hooks';
import '../../src/styles/pages/PlanPage.scss'
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const { selectedStock } = state
    const { data: planTableData, loading, error } = hook.useFetchData(`/api/fetch_plan`)
    const { data: allStockData, loading: loading2, error: error2 } = hook.useFetchData(`/api/fetch_latest_stock`)

    useEffect(() => {
        const fetchIndicators = () => {
            axios.get(`/api/fetch_latest_stock/${selectedStock.code}`)
                .then((res) => { dispatch({ type: actions.SET_INDICATORS, payload: res.data }); })
                .catch((err) => { console.error(err.message) })
        }
        planTableData && dispatch({ type: actions.SET_PLAN, payload: planTableData });
        allStockData && dispatch({ type: actions.SET_ALL_STOCKS, payload: allStockData });
        (!selectedStock && planTableData) && dispatch({ type: actions.SET_SELECTED_STOCK, payload: planTableData[0] });
        selectedStock && fetchIndicators()
    }, [selectedStock, planTableData, allStockData, dispatch])
    if (loading || loading2) return <Loading />
    if (error || error2) return <Message variant="error">{error}</Message>

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
