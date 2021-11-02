import React, { useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import "../../styles/components/Header.scss";

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    let history = useHistory();
    const logout = () => {
        localStorage.removeItem('access_token');
        dispatch({ type: AppActions.SET_USER, payload: { ...user, status: false } });
        history.push('/');
    };
    return (
        <div className="header">
            <div className="left_menu">
                <Link to="/"><i className="logo fas fa-umbrella"></i><span className="logo_title">traweather</span></Link>
            </div>
            <ul className="right_menu">
                {(user.id && user.status) ? (
                    <>
                        <li >{user.name}</li>
                        <li className="log_out_bttn" onClick={logout}>logout</li>
                    </>
                ) : <li className="log_in_bttn" ><Link to="/login">login</Link></li>}
            </ul>
        </div>
    );
};
