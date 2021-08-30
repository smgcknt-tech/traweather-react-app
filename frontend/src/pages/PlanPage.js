import '../../src/styles/pages/PlanPage.scss'
import React, { createContext, useEffect,useState } from 'react'
import { hook } from '../utils/custom_hooks';
import StoryTable from '../components/StoryTable'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Reason from '../components/Reason';
import Strategy from '../components/Strategy';
import StoryChart from '../components/StoryChart';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
export const CurrentStock = createContext({ stock: "", setStock: () => { } });
export default function PlanPage() {
    const url = `/api/fetch_plan`
    const { data, loading, error } = hook.useFetchData(url)
    const [stock, setStock] = useState(null)
    const [latestData, setLatestData] = useState(null)
    useEffect(() => {
        if (!stock && data) { setStock(data[0]) }
        const fetchData = async () => {
            if (stock) {
                const url = `/api/fetch_latest_stock/${stock.code}`
                const { data } = await axios.get(url);
                setLatestData(data)
            }
        }
        fetchData();
    }, [stock, data])

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <CurrentStock.Provider value={{ stock, setStock }}>
            <SearchBar />
            <div className="plan_page">
                <div className="left_side">
                    <StoryTable planData={data} />
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
