import React from 'react';
import { useHistory } from 'react-router';
import SearchBox from '../components/SearchBox';
import '../styles/pages/ScreeningPage.scss';

export default function ScreeningPage() {
  let history = useHistory();
  const handleClick=()=>{
    history.push({ pathname: '/pickup', state: "favorite" });
  }
  return (
    <div className="screening_page">
      <div className="center_area">
        <SearchBox />
        <div className="pickup">
          <div>
            <h2>PICKUP</h2>
            <ul className='stock_list'>
              <li onClick={handleClick}>お得意銘柄</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
