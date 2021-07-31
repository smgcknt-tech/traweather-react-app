import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="header row">
            <div className="row left_menu">
                <Link className="logo" to="/">traweather</Link>
                <p className="catch_copy">~market prediction for day traders~</p>
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
