
import React, { useEffect, useState } from 'react'
import "../styles/views/TopPage.scss";
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';
import Indicator from "../components/Indicator";
import IndexChart from "../components/IndexChart";
import Strategy from "../components/Strategy";
import HotSector from "../components/HotSector";
import NewsTopics from '../components/NewsTopics';

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
            {loading ? (<Loading />)
                : error ? (<Message variant="error">{error}</Message>)
                    : (
                        <div className="top_page">
                            <div className="row center">
                                {indicators.map((indicator) => {
                                    return <Indicator indicator={indicator} />
                                })}
                            </div>
                            <div class="row center">
                                <IndexChart />
                                <Strategy />
                            </div>
                            <div class="row center">
                                <div className="row">
                                    <HotSector />
                                    <NewsTopics />
                                </div>

                            </div>
                        </div>
                    )}
        </div>
    )
}
