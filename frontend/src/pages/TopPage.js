import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Indicator from "../components/Indicator";
import LineChart from "../components/IndexChart";
import Strategy from "../components/Strategy";

export default function TopPage() {
    const [indicators, setIndicators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/indicators');
                setLoading(false);
                setIndicators(data);
            } catch (err) {
                setError(err.message)
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {loading ? (<Loading/>)
                : error ? (<Message variant="error">{error}</Message>)
                    : (
                        <div>
                            <div className="row center">
                                {indicators.map((indicator) => {
                                    return <Indicator indicator={indicator}/>
                                })}
                            </div>
                            <div class="row center chart_container">
                                <LineChart/>
                                <Strategy/>
                            </div>
                        </div>
                    )}
        </div>
    )
}
