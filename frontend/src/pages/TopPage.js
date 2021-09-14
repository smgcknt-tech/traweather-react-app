import '../../src/styles/pages/TopPage.scss'
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import Ticker from '../components/widgets/Ticker';
import Event from '../components/widgets/Event';
import Twitter from '../components/widgets/Twitter';
import { useContext, useState } from 'react';
import { context } from '../stores/TopPage'
import MarketPredictionForm from '../components/form/MarketPredictionForm';

export default function TopPage() {
    const { state } = useContext(context);
    const { loading, error } = state
    const [open, setOpen] = useState(false)

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="top_page">
            <ul className="header_menu">
                <li onClick={() => { setOpen('prediction') }}><i className="fas fa-edit"></i>予想記入</li>
            </ul>
            <div className="main">
                {open === "prediction" && <MarketPredictionForm setOpen={setOpen} />}
                <div className="dashboard_row1">
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
