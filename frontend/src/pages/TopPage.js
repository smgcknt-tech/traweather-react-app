import '../../src/styles/pages/TopPage.scss'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Ticker from '../components/widgets/Ticker';
import Event from '../components/widgets/Event';
import Twitter from '../components/widgets/Twitter';
import { useContext, useState } from 'react';
import { context } from '../stores/TopPage'
import MarketPredictionForm from '../components/MarketPredictionForm';
import { AppContext } from '../stores/App';

export default function TopPage() {
    const { state } = useContext(context);
    const { loading, error } = state
    const [open, setOpen] = useState(false)

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="top_page">
            <ul className="menu_list">
                <li onClick={() => { setOpen('prediction') }}>予想記入</li>
            </ul>
            {open === "prediction" && <MarketPredictionForm setOpen={setOpen} />}
            <div className="dashboard_row1">
                <Ticker />
            </div>
            <div className="dashboard_row2">
                <div className="left">
                    <Twitter />
                </div>
                <div className="right">
                    <Event />
                </div>
            </div>
        </div>
    )
}
