import React, { useContext } from 'react'
import { context } from '../stores/PlanPage';
import '../styles/components/Reason.scss'

export default function Reason() {
    const { state} = useContext(context);
    const { selectedStock } = state;
    return (
        <>
            {selectedStock && (
                <div className="reason">
                    <h2 className="title">選定理由</h2>
                    <div className="content">{selectedStock?.reason}</div>
                </div>
            )}
        </>
    )
}
