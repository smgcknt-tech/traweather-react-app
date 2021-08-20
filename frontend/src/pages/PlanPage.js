import React from 'react'
import StoryTable from '../components/StoryTable'
import '../../src/styles/pages/PlanPage.scss'

export default function PlanPage() {
    return (
        <div className="plan_page">
            <div className="left_side">
                <StoryTable />
            </div>
            <div className="right_side">
                {/* reason */}
                {/* strategy */}
            </div>
        </div>
    )
}
