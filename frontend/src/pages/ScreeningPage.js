import React from 'react';
import SearchBox from '../components/SearchBox';
import '../styles/pages/ScreeningPage.scss';

export default function ScreeningPage() {
  return (
    <div className="screening_page">
      <div className="center_area">
        <SearchBox />
        <div className="pickup">
          <div>
            <h2>PICKUP</h2>
            <ul className='stock_list'>
              <li>list1</li>
              <li>list2</li>
              <li>list3</li>
              <li>list4</li>
              <li>list5</li>
              <li>list6</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
