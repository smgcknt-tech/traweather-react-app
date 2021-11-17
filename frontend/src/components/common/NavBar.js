import React from 'react';
import '../../styles/components/NavBar.scss';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  return (
    <div className="nav_bar">
      <ul className="nav_menu">
        <Link to="/market">
          <li className={location.pathname === '/market' ? 'selected' : 'not'}>
            <i className="fas fa-cloud-sun"></i>
            <p>地合</p>
          </li>
        </Link>
        <Link to="/plan">
          <li className={location.pathname === '/plan' ? 'selected' : 'not'}>
            <i className="fas fa-chess-pawn"></i>
            <p>計画</p>
          </li>
        </Link>
        <Link to="/result">
          <li className={location.pathname === '/result' ? 'selected' : 'not'}>
            <i className="fas fa-chart-bar"></i>
            <p>結果</p>
          </li>
        </Link>
        <Link to="/reflection">
          <li className={location.pathname === '/reflection' ? 'selected' : 'not'}>
            <i className="fas fa-book"></i>
            <p>振返</p>
          </li>
        </Link>
        <Link to="/screening">
          <li
            className={
              location.pathname === '/screening' || location.pathname === '/search' || location.pathname === '/pickup'
                ? 'selected'
                : 'not'
            }
          >
            <i className="fas fa-search-plus"></i>
            <p>検索</p>
          </li>
        </Link>
      </ul>
    </div>
  );
}
