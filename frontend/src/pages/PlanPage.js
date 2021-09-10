import '../../src/styles/pages/PlanPage.scss'
import React, { useContext, useEffect, useState} from 'react'
import { context, actions } from '../stores/PlanPage'
import { AppContext} from '../stores/App'
import { hooks } from '../utils/custom_hooks';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';
import Prediction from '../components/Prediction';
import LogInPage from './EntrancePage';
import PlanAddForm from '../components/PlanAddForm'

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const {planData, prediction, loading, error } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;
    const [open, setOpen] = useState(false)
    hooks.useFetchPlanPageData(AppState, state,dispatch,actions)

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="plan_page">
            <SearchBar />
            <div className="dashboard">
                <div className="left">
                    <ul className="menu_button">
                        <li onClick={() => { setOpen("add") }} >銘柄追加</li>
                    </ul>
                    {open === "add" && (<PlanAddForm setOpen={setOpen} />)}
                    {planData.length > 0 && (<StoryTable />)}
                    <StoryChart />
                </div>
                <div className="right">
                    <Reason />
                    <Strategy />
                </div>
            </div>
            {prediction && <Prediction />}
        </div>
    )
}
