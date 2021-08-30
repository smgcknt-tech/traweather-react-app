import '../../src/styles/pages/PlanPage.scss'
import React, { createContext, useEffect, useReducer } from 'react'
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
export const PlanReducer = createContext();
export default function PlanPage() {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_ALL_STOCKS':
                return { ...state, allStocks: action.payload }
            case 'SET_SELECTED_STOCK':
                return { ...state, selectedStock: action.payload }
            case 'SET_INDICATORS':
                return { ...state, indicators: action.payload }
            case 'SET_PLAN':
                return { ...state, planData: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        allStocks:[],
        planData: null,
        selectedStock: null,
        indicators: null,
    })
    const { selectedStock } = state
    //console.log(state)
    const { data: planTableData, loading, error } = hook.useFetchData(`/api/fetch_plan`)
    const { data: allStockData, loading: loading2, error: error2 } = hook.useFetchData(`/api/fetch_latest_stock`)
    useEffect(() => {
        const fetchIndicators = async () => {
            axios.get(`/api/fetch_latest_stock/${selectedStock.code}`)
            .then((res) => {
                dispatch({ type: 'SET_INDICATORS', payload: res.data });
            }).catch((err) => {
                console.error(err.message)
            })
        }
        planTableData && dispatch({ type: 'SET_PLAN', payload: planTableData });
        allStockData && dispatch({ type: 'SET_ALL_STOCKS', payload: allStockData });
        (!selectedStock && planTableData) && dispatch({ type: 'SET_SELECTED_STOCK', payload: planTableData[0] });
        selectedStock && fetchIndicators()
    }, [selectedStock, planTableData, allStockData])
    if (loading || loading2) return <Loading />
    if (error || error2) return <Message variant="error">{error}</Message>
    return (
        <PlanReducer.Provider value={{ state, dispatch }}>
            <SearchBar />
            <div className="plan_page">
                <div className="left">
                    <StoryTable />
                    <StoryChart />
                </div>
                <div className="right">
                    <Reason />
                    <Strategy />
                </div>
            </div>
        </PlanReducer.Provider>
    )
}
