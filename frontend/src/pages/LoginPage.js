import { useContext, useState } from 'react';
import LogInForm from '../components/form/LogInForm';
import RegisterForm from '../components/form/RegisterForm';
import '../styles/pages/LoginPage.scss'
import { AppContext } from '../stores/App';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;
    const [open, setOpen] = useState(null);
    return (
        <div className="login">
            <div className="form_container">
                <div className="message">
                    <h2>TRAWEATHER</h2>
                    <p>-investment and trade supporting tool for you-</p>
                    {(user.status && user.id) && <div className="button_container"><Link to="/market"><div className="button">利用開始</div></Link></div>}
                </div>
                {(!user.status || !user.id)  && (
                    <div>
                        {open === "register" ? <RegisterForm setOpen={setOpen} /> : <LogInForm setOpen={setOpen} />}
                    </div>
                    
                )}
            </div>
        </div>
    )
}
