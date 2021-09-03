import '../../src/styles/pages/TopPage.scss'
import Ticker from '../components/widgets/Ticker';
import Event from '../components/widgets/Event';
import Twitter from '../components/widgets/Twitter';
import { useState } from 'react';
import MarketPredictionForm from '../components/MarketPredictionForm';

export default function TopPage() {
    const [open, setOpen] = useState(false)

    return (
        <div className="top_page">
            <ul className="menu_list">
                <li onClick={()=>{setOpen('prediction')}}>予想記入</li>
            </ul>
            {open === "prediction" && <MarketPredictionForm setOpen={setOpen}/>}
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
