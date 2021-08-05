import React from 'react'
import "../styles/components/NavBar.scss"
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className="nav_bar">
            <ul　className="nav_menu">
                <Link to="/"><li><i class="fas fa-cloud-sun"></i><p>地合</p></li></Link>
                <Link to="/plan"><li><i class="fas fa-chess-pawn"></i><p>計画</p></li></Link>
                <Link to="/result"><li><i class="fas fa-chart-bar"></i><p>結果</p></li></Link>
                <Link to="/Feedback"><li><i class="fas fa-book"></i><p>振返</p></li></Link>
                <Link to="/Setting"><li><i className="fas fa-cog"></i><p>設定</p></li></Link>
            </ul>
        </div>
    )
}
