import React from 'react'
import "../styles/components/Loading.scss"


export default function Loading() {
    return (
        <div className="Loading fa-3x">
            <i className="fas fa-spinner fa-pulse"></i><span>&ensp;Now Loading....</span>
        </div>
    )
}
