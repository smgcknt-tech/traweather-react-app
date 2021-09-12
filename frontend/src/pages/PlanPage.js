import '../../src/styles/pages/PlanPage.scss'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { context, actions } from '../stores/PlanPage'
import { AppContext } from '../stores/App'
import { helper } from '../utils/helper';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';
import Prediction from '../components/Prediction';
import PlanAddForm from '../components/PlanAddForm'

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const { selectedStock, planData, allStocks, prediction, loading, error } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (user.id) {
            helper.fecthData(`/api/fetch_plan`, dispatch, actions, {
                user_id: user.id
            }).then((fetchedPlan) => {
                if (fetchedPlan.length > 0) {
                    dispatch({ type: actions.SET_PLAN, payload: fetchedPlan });
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
        if (allStocks && planData.length > 0) {
            if (!selectedStock) {
                return allStocks.find((stock) => planData[0].code === Number(stock.code))
            } else if (selectedStock) {
                return allStocks.find((stock) => selectedStock.code === Number(stock.code))
            }
        }
    }, [selectedStock, planData, allStocks])

    useEffect(() => {
        if (!selectedStock) {
            dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[0] })
            dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
        } else if (selectedStock) {
            dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
        }
    }, [indicatorsData, selectedStock]);

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="plan_page">
            <ul className="header_menu">
                <li onClick={() => { setOpen("add") }} ><i className="fas fa-edit" />銘柄追加</li>
            </ul>
            <div className="main">
                <SearchBar />
                <div className="dashboard_container">
                    <div className="left_col">
                        {open === "add" && <PlanAddForm setOpen={setOpen} />}
                        {planData.length > 0 ? <StoryTable /> : <PlanAddForm setOpen={setOpen} />}
                        <StoryChart />
                    </div>
                    <div className="right_col">
                        <Reason />
                        <Strategy />
                    </div>
                </div>
                {prediction && <Prediction />}
            </div>
        </div>
    )
}
