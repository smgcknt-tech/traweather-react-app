import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/Header.scss"
import { AppActions, AppContext } from '../stores/App'

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const { auth,user } = state
    const logout = () => {
        localStorage.removeItem('access_token')
        dispatch({ type: AppActions.SET_AUTH, payload: false });
    }
    return (
        <div className="header">
            <div className="left_menu">
                <Link to="/"><i className="logo fas fa-umbrella"></i><span className="logo_title">traweather</span></Link>
            </div>
            <ul className="right_menu">
                {!auth ? (
                    <li><Link to="/user/login">login</Link></li>
                ) : (
                    <>
                    <li >{user.name}</li>
                    <li onClick={logout}>logout</li>
                    </>
                )}
            </ul>
        </div>
    )
}
