import { Link } from 'react-router-dom';
import '../styles/pages/EntrancePage.scss';
import user1 from '../images/user1.jpg'
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
                    <h2>Main Features</h2>
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
                            <i className="fas fa-chart-bar"></i>
                            <p>Trade result analysis</p>
                        </div>
                        <div className="card">
                            <i className="fas fa-pen-square"></i>
                            <p>Trade result review</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user_review_container">
                <div className="review">
                    <h2>What Users Are Saying</h2>
                    <p>"this app helps me prepare for trade plan a lot"</p>
                    <div className='user_profile'>
                        <img src={user1} alt='user_image' />
                        <p>Michael, New York USA</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
