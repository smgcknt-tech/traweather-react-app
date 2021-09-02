import React, { memo } from 'react'
import "../styles/components/Loading.scss"

export default memo(function Loading() {
    return (
        <div className="loading fa-3x">
            <i className="fas fa-spinner fa-pulse"></i><span>&ensp;Now Loading....</span>
        </div>
    )
})
