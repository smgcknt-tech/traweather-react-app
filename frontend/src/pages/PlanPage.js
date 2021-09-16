import '../../src/styles/pages/PlanPage.scss'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { context, actions } from '../stores/PlanPage'
import { AppContext, AppActions } from '../stores/App'
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
    const { selectedStock, planData } = state
    const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
    const { user, prediction, allStocks, loading, error } = AppState;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (user.id) {
            const fetchPlanPageData = async () => {
                const fetchedPlan = await helper.fetchData(`/api/fetch_plan`, AppDispatch, AppActions, {
                    user_id: user.id
                })
                if (fetchedPlan?.length > 0) {
                    dispatch({ type: actions.SET_PLAN, payload: fetchedPlan });
                    dispatch({ type: actions.SET_SELECTED_STOCK, payload: fetchedPlan[0] })
                }

                const fetchedPrediction = await helper.fetchData(`/api/fetch_one_prediction`, AppDispatch, AppActions, {
                    user_id: user.id,
                })
                if (fetchedPrediction) AppDispatch({ type: AppActions.SET_PREDICTION, payload: fetchedPrediction });

                const fetchedStocks = await helper.fetchData(`/api/fetch_latest_stock`, AppDispatch, AppActions,)
                if (fetchedStocks) AppDispatch({ type: AppActions.SET_ALL_STOCKS, payload: fetchedStocks });
            }
            fetchPlanPageData()
        }
    }, [user.id]);

    const indicatorsData = useMemo(() => {
        if (allStocks && selectedStock) return allStocks.find((stock) => selectedStock.code === Number(stock.code))
    }, [selectedStock, allStocks, planData])

    useEffect(() => {
        if (selectedStock) dispatch({ type: actions.SET_INDICATORS, payload: indicatorsData });
    }, [indicatorsData, selectedStock]);

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="plan_page">
            <ul className="header_menu">
                <li onClick={() => { setOpen("add") }} ><i className="fas fa-edit" />銘柄追加</li>
            </ul>
            {(planData?.length === 0) && <Message >プランデータがありません。まずはプランデータを作成しましょう。</Message>}
            <div className="main">
                <SearchBar />
                <div className="dashboard">
                    <div className="dashboard_row1">
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
                    <div className="dashboard_row2">
                        {prediction && <Prediction />}
                    </div>
                </div>
            </div>
        </div>
    )
}
