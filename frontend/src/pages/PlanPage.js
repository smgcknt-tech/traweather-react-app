import '../../src/styles/pages/PlanPage.scss'
import React, { useContext, useEffect } from 'react'
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
    const { selectedStock, loading, error } = state
    useEffect(() => {
        helper.fecthData(`/api/fetch_plan`, dispatch, actions)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                (data) && dispatch({ type: actions.SET_SELECTED_STOCK, payload: data[0] });
            });
        helper.fecthData(`/api/fetch_latest_stock`, dispatch, actions)
            .then((data) => { dispatch({ type: actions.SET_ALL_STOCKS, payload: data }); });
    }, [dispatch]);
    useEffect(() => {
        selectedStock && helper.fecthData(`/api/fetch_latest_stock/${selectedStock.code}`, dispatch, actions)
            .then((data) => { dispatch({ type: actions.SET_INDICATORS, payload: data }); });
    }, [selectedStock, dispatch]);

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
