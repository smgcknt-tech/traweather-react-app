import React, { useContext, useEffect, useState } from 'react';
import { AppContext, AppActions } from '../AppStore';
import { helper } from '../utils/helper';
import '../../src/styles/pages/MarketPage.scss';
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import Ticker from '../components/widgets/Ticker';
import Event from '../components/widgets/Event';
import Twitter from '../components/widgets/Twitter';
import Prediction from '../components/Prediction';
import MarketPredictionForm from '../components/forms/MarketPredictionForm';
import HeatMap from '../components/HeatMap';

export default function MarketPage() {
    const { state, dispatch } = useContext(AppContext);
    const { user, prediction, heatmapData, loading, error } = state;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user.id) {
            const fetchData = async () => {
                const fetchedPrediction = await helper.fetchData(`/api/prediction`, dispatch, AppActions, {
                    user_id: user.id, date: helper.time().today
                })
                if (fetchedPrediction) dispatch({ type: AppActions.SET_PREDICTION, payload: fetchedPrediction });
                const fetchedHeatmapData = await helper.fetchData(`/api/market_heatmap`, dispatch, AppActions);
                if (fetchedHeatmapData) dispatch({ type: AppActions.SET_HEAT_MAP, payload: fetchedHeatmapData });
            };
            fetchData();
        }
    }, [user.id]);// eslint-disable-line

    if (loading) return <Loading />;
    if (error) return <Message variant="error">{error}</Message>;
    return (
        <div className="Market_page">
            <ul className="header_menu">
                <li onClick={() => { setOpen('prediction') }}><i className="fas fa-edit"></i>予想記入</li>
            </ul>
            {!prediction && <Message >今日の市場予想がありません。まずは市場予想を作成しましょう。</Message>}
            <div className="main">
                {(open === "prediction") && <MarketPredictionForm setOpen={setOpen} />}
                <div className="dashboard_row1">
                    {prediction && <Prediction />}
                    <HeatMap />
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
    );
};