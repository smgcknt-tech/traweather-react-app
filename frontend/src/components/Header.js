import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/Header.scss"

export default memo(function Header() {
    return (
        <div className="header">
            <div className="left_menu">
                <Link to="/"><i className="logo fas fa-umbrella"></i><span className="logo_title">traweather</span></Link>
                <p className="catch_copy">- market prediction and analytics tool for day traders -</p>
            </div>
            <ul className="right_menu">
                <li>menu</li>
                <li>login</li>
            </ul>
        </div>
    )
})
