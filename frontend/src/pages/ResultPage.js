import '../../src/styles/pages/ResultPage.scss'
import React, { useContext, useEffect } from 'react'
import Loading from '../components/Loading';
import Message from '../components/Message';
import { AppContext } from '../stores/App';
import { actions, context } from '../stores/ResultPage';
import { helper } from '../utils/helper';
import ResultTable from '../components/ResultTable'

export default function ResultPage() {
    const { state, dispatch } = useContext(context);
    const { resultData, loading, error } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;
    useEffect(() => {
        if (user.id) {
            const fetchPlanPageData = async () => {
                const fetchedResult = await helper.fetchData(`/api/fetch_result`, dispatch, actions, {
                    user_id: user.id
                })
                if (fetchedResult?.length > 0) {
                    dispatch({ type: actions.SET_RESULT, payload: fetchedResult });
                }
            }
            fetchPlanPageData()
        }
    }, [user.id]);
    if (loading) return <Loading/>
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="result_page">
            <div className="main">
                <div className="dashboard_container">
                    <div className="left_col">
                        {resultData.length > 0 && <ResultTable />}
                    </div>
                    <div className="right_col">
                    </div>
                </div>
            </div>
        </div>
    )
}
