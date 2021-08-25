import '../../src/styles/pages/PlanPage.scss'
import React, { createContext, useState } from 'react'
import { hook } from '../utils/custom_hooks';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Flash from '../components/Flash';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
export const CurrentStock = createContext({ stock: "", setStock: () => { } });
export default function PlanPage() {
    const url = `/api/fetch_plan`
    const { data, loading, error } = hook.useFetchData(url)
    const { flash } = hook.useRedirect()
    const [stock, setStock] = useState()
    const value = { stock, setStock }
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <CurrentStock.Provider value={value}>
            {(flash) && (<Flash flash={flash}/>)}
            <div className="plan_page">
                <div className="left_side">
                    <StoryTable data={data} />
                    <StoryChart/>
                </div>
                <div className="right_side">
                    <Reason />
                    <Strategy/>
                </div>
            </div>
        </CurrentStock.Provider>
    )
}
