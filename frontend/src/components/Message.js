import React from 'react'
import "../styles/components/Message.scss"

export default function Loading(props) {
    return (
        <div className="message">
            <div className={`alert alert-${props.variant || 'info'}`}>{props.children}</div>
        </div>
    );
}
