import '../../src/styles/pages/PlanPage.scss'
import React, { createContext, useEffect, useState } from 'react'
import { hook } from '../utils/custom_hooks';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Flash from '../components/Flash';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
export const CurrentStock = createContext({ stock: "", setStock: () => { } });
export default function PlanPage() {
    const url = `/api/fetch_plan`
    const { data, loading, error } = hook.useFetchData(url)
    const planData =data;
    const { flash } = hook.useFlash()
    const [stock, setStock] = useState(null)
    const [latestData, setLatestData] = useState(null)
    const value = { stock, setStock }




    
    useEffect(() => {
        if(!stock && planData){
            setStock(planData[0])
        }
        const fetchData = async () => {
            const url = `/api/fetch_latest_stock/${stock.code}`
            const { data } = await axios.get(url);
            setLatestData(data)
        }
        stock && fetchData();
    }, [stock, planData])
    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <CurrentStock.Provider value={value}>
            {(flash) && (<Flash flash={flash} />)}
            <SearchBar/>
            <div className="plan_page">
                <div className="left_side">
                    <StoryTable data={planData} />
                    <StoryChart latestData={latestData} />
                </div>
                <div className="right_side">
                    <Reason />
                    <Strategy />
                </div>
            </div>
        </CurrentStock.Provider>
    )
}
