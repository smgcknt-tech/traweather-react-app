import React from 'react'
import  '../styles/components/Flash.scss'

export default function Flash(props) {
    return (
        <div className="flash">
            <div>{props.flash}</div>
        </div>
    )
}
