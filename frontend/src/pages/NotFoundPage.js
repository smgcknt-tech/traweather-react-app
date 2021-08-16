import React from 'react'
import { useLocation } from 'react-router'

export default function NotFoundPage() {
    let location = useLocation()
    return (
        <div>
            <div>{location.pathname}</div>
            <div>お探しのページはございません。</div>
        </div>
    )
}
