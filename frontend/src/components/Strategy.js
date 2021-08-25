import React, { useContext } from 'react'
import { CurrentStock } from '../pages/PlanPage'
import '../styles/components/Strategy.scss'

export default function Strategy() {
    const { stock } = useContext(CurrentStock)
    return (
        <>
            {stock && (
                <div className="strategy">
                    <h2 className="title">今日の戦略</h2>
                    <div className="content">{stock?.strategy}</div>
                </div>
            )}
        </>
    )
}
