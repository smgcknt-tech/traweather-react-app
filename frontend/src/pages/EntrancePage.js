import '../styles/pages/LoginPage.scss'
import { Link } from 'react-router-dom';
export default function LoginPage() {
    return (
        <div className="login">
            <div className="form_container">
                <div className="message">
                    <h2>TRAWEATHER</h2>
                    <p>-investment and trade supporting tool for you-</p>
                    <div className="button_container"><Link to="/market"><div className="button">利用開始</div></Link></div>
                </div>
            </div>
        </div>
    )
}
