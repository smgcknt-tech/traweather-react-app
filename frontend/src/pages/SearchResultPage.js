import React from 'react';
import { useLocation } from 'react-router';
import StockDescription from '../components/StockDescription.js';
import '../styles/pages/SearchResultPage.scss';

export default function SearchResultPage() {
  const location = useLocation();
  return (
    <div className='search_result'>
      {<StockDescription code={location.state} />}
    </div>
    );
}
