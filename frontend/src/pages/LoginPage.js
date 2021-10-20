import { useContext, useState } from 'react';
import { AppContext } from '../AppStore';
import { Link } from 'react-router-dom';
import LogInForm from '../components/forms/LogInForm';
import RegisterForm from '../components/forms/RegisterForm';
import '../styles/pages/LoginPage.scss'

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
                    {(user.status && user.id) &&
                        <div className="button_container">
                            <Link to="/market"><div className="button">利用開始</div></Link>
                        </div>
                    }
                </div>
                {(!user.status || !user.id) && (
                    <div>
                        {open === "register" ? <RegisterForm setOpen={setOpen} /> : <LogInForm setOpen={setOpen} />}
                    </div>
                )}
            </div>
        </div>
    )
}
