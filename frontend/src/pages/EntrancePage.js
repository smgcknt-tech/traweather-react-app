import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import LogInForm from '../components/LogInForm';
import RegisterForm from '../components/RegisterForm';
import { AppContext, AppActions } from '../stores/App'
import '../styles/pages/EntrancePage.scss'

export default function EntrancePage() {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state
    const [open, setOpen] = useState(null)

    return (
        <div className="entrance">
            <div className="form_container">
                <div className="message">
                    <h2>TRAWEATHER</h2>
                    <p>-investment and trade supporting tool for you-</p>
                </div>
                {open === "register" ? <RegisterForm setOpen={setOpen} /> : <LogInForm setOpen={setOpen} />}
            </div>
        </div>
    )
}
