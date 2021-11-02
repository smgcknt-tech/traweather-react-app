import { Link } from 'react-router-dom';
import '../styles/pages/EntrancePage.scss';
export default function LoginPage() {
    return (
        <div className="entrance">
            <div className="main_container">
                <div className="message">
                    <h2>TRAWEATHER</h2>
                    <p>-investment and trade supporting tool for you-</p>
                    <div className="button_container">
                        <Link to="/market"><div className="button">利用開始</div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
