import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/Header.scss"

export default function Header() {
    return (
        <div className="header row">
            <div className="row left_menu">
                <i className="logo fas fa-umbrella"></i>
                <Link className="logo_title" to="/">traweather</Link>
                <p className="catch_copy">- market prediction and analytics tool for day traders -</p>
            </div>
            <div>
                <ul className="row right_menu">
                    <li>menu</li>
                    <li>login</li>
                </ul>
            </div>
        </div>
    )
}
