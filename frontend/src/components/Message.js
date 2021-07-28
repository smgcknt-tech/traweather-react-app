import React from 'react'

export default function Loading(props) {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>{props.children}</div>
    );
}
