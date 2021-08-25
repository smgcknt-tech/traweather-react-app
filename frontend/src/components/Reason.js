import React, { useContext } from 'react'
import { CurrentStock } from '../pages/PlanPage'
import '../styles/components/Reason.scss'

export default function Reason() {
    const { stock } = useContext(CurrentStock)
    return (
        <>
            {stock && (
                <div className="reason">
                    <h2 className="title">選定理由</h2>
                    <div className="content">{stock?.reason}</div>
                </div>
            )}
        </>
    )
}
