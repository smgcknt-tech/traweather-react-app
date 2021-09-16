import { useState } from 'react';
import LogInForm from '../components/form/LogInForm';
import RegisterForm from '../components/form/RegisterForm';
import '../styles/pages/EntrancePage.scss'

export default function EntrancePage() {
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
