import '../../src/styles/pages/TopPage.scss'
import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppActions } from '../stores/App';
import { helper } from '../utils/helper';
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import Ticker from '../components/widgets/Ticker';
import Event from '../components/widgets/Event';
import Twitter from '../components/widgets/Twitter';
import Prediction from '../components/Prediction';
import MarketPredictionForm from '../components/form/MarketPredictionForm';

export default function TopPage() {
    const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
    const { user, prediction, loading, error } = AppState;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (user.id) {
            const fetchData = async () => {
                const fetchedPrediction = await helper.fetchData(`/api/fetch_one_prediction`, AppDispatch, AppActions, {
                    user_id: user.id,
                    date: helper.get_today()
                })
                if (fetchedPrediction) AppDispatch({ type: AppActions.SET_PREDICTION, payload: fetchedPrediction });
            }
            fetchData();
        }
    }, [user.id])

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="top_page">
            <ul className="header_menu">
                <li onClick={() => { setOpen('prediction') }}><i className="fas fa-edit"></i>予想記入</li>
            </ul>
            {!prediction && <Message >今日の市場予想がありません。まずは市場予想を作成しましょう。</Message>}
            <div className="main">
                {(open === "prediction" || !prediction) && <MarketPredictionForm setOpen={setOpen} />}
                <div className="dashboard_row1">
                    {prediction && <Prediction />}
                    <Ticker />
                </div>
                <div className="dashboard_row2">
                    <div className="left_col">
                        <Twitter />
                    </div>
                    <div className="right_col">
                        <Event />
                    </div>
                </div>
            </div>
        </div>
    )
}
