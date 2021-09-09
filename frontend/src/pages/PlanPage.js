import '../../src/styles/pages/PlanPage.scss'
import React, { useContext} from 'react'
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
import LogInPage from './LogInPage';

export default function PlanPage() {
    const { state, dispatch } = useContext(context);
    const {planData, prediction, loading, error } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;
    hooks.useFetchPlanPageData(AppState, state,dispatch,actions)

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    if (!user.status) return <LogInPage />
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
            {prediction && <Prediction />}
        </div>
    )
}
