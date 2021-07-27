import React from 'react'

export default function indicator(props) {
    const {indicator} = props
    return (
        <div className="indicator"　key={indicator.id}>
            <p>{indicator.name}</p>
            <p>{indicator.price}</p>
        </div>
    )
}
