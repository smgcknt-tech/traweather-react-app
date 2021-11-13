import React from 'react';
import { useLocation } from 'react-router';
import '../../src/styles/pages/ScreeningPage.scss';
import StockDescription from '../components/common/StockDescription';

export default function SearchResultPage() {
  const location = useLocation();
  return <div>{<StockDescription code={location.state} />}</div>;
}
