import '../../src/styles/pages/PlanPage.scss'
import React, { createContext, useState } from 'react'
import { hook } from '../utils/custom_hooks';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Flash from '../components/Flash';
import Reason from '../components/Reason';
export const CurrentStock = createContext({ stock: "", setStock: () => { } });
export default function PlanPage() {
    const { flash } = hook.useRedirect()
    const [stock, setStock] = useState(null)
    const value = { stock, setStock }
    const url = `/api/fetch_plan`
    const { data, loading, error } = hook.useFetchData(url)
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <CurrentStock.Provider value={value}>
            {(flash) && (<Flash flash={flash}/>)}
            <div className="plan_page">
                <div className="left_side">
                    <StoryTable data={data} />
                </div>
                <div className="right_side">
                    <Reason />
                    {/* strategy */}
                </div>
            </div>
        </CurrentStock.Provider>
    )
}
