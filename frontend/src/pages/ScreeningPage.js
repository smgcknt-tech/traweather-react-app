import React from 'react';
import '../../src/styles/pages/ScreeningPage.scss';
import SearchArea from '../components/common/SearchArea';

export default function ScreeningPage() {
  return (
    <div className="screening_page">
      <div className="center_area">
        <SearchArea />
      </div>
    </div>
  );
}
