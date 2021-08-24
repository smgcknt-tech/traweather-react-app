import React, { useContext } from 'react'
import { CurrentStock } from '../pages/PlanPage'

export default function Reason() {
    const { stock } = useContext(CurrentStock)
    return (
        <div>
            <div>{stock?.reason}</div>
        </div>
    )
}
