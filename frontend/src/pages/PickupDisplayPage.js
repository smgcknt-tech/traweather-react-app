import React from 'react'
import { useLocation } from 'react-router';
import FavoriteStockList from '../components/FavoriteStockList';

export default function PickupDisplayPage() {
    const location = useLocation();
    return (
        <div>
            {location.state ==='favorite' && <FavoriteStockList/>}
        </div>
    )
}
