import '../../src/styles/pages/PlanPage.scss'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { context, actions } from '../stores/PlanPage'
import { AppContext } from '../stores/App'
import { helper } from '../utils/helper';
import StoryTable from '../components/StoryTable'
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';
import Prediction from '../components/Prediction';
import PlanAddForm from '../components/form/PlanAddForm'

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const { selectedStock, planData, allStocks, prediction, loading, error } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (user.id) {
            const fetchPlanPageData = async () => {
                const fetchedPlan = await helper.fetchData(`/api/fetch_plan`, dispatch, actions, {
                    user_id: user.id
                })
                if (fetchedPlan?.length > 0) {
                    dispatch({ type: actions.SET_PLAN, payload: fetchedPlan });
                    dispatch({ type: actions.SET_SELECTED_STOCK, payload: fetchedPlan[0] })
                }

                const fetchedPrediction = await helper.fetchData(`/api/fetch_one_prediction`, dispatch, actions, {
                    user_id: user.id,
                    date: helper.get_today()
                })
                if (fetchedPrediction) dispatch({ type: actions.SET_PREDICTION, payload: fetchedPrediction });

                const fetchedStocks = await helper.fetchData(`/api/fetch_latest_stock`, dispatch, actions)
                if (fetchedStocks) dispatch({ type: actions.SET_ALL_STOCKS, payload: fetchedStocks });
            }
            fetchPlanPageData()
        }
    }, [user.id]);

    const indicatorsData = useMemo(() => {
        if (allStocks && selectedStock) return allStocks.find((stock) => selectedStock.code === Number(stock.code))
    }, [selectedStock, allStocks, planData])

    useEffect(() => {
        if (selectedStock) dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
    }, [indicatorsData]);

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
                        {(open === "add" || planData.length === 0) && <PlanAddForm setOpen={setOpen} />}
                        {planData.length > 0 && <StoryTable />}
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
