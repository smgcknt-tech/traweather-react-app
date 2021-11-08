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
            <div className="explanation_container">
                <div className="feature_list_container">
                    <h2>MAIN FEATURES</h2>
                    <div className="feature_cards">
                        <div className="card">
                            <i className="fas fa-cloud-sun-rain"></i>
                            <p>Market tone analysis</p>
                        </div>
                        <div className="card">
                            <i className="fas fa-ruler"></i>
                            <p>Trade plan recording</p>
                        </div>
                        <div className="card">
                            <i class="fas fa-chart-bar"></i>
                            <p>Trade result analysis</p>
                        </div>
                        <div className="card">
                            <i className="fas fa-pen-square"></i>
                            <p>Trade result review</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
