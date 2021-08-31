import React, { useContext } from 'react'
import { context } from '../stores/PlanPage';
import '../styles/components/Strategy.scss'

export default function Strategy() {
    const { state } = useContext(context);
    const { selectedStock } = state;
    return (
        <div className="strategy">
            <h2 className="title">今日の戦略</h2>
            <div className="content">{selectedStock ? selectedStock.strategy : "no data"}</div>
        </div>
    )
}
