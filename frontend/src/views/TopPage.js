
import React, { useEffect, useState } from 'react'
import "../styles/views/TopPage.scss";
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';
import IndexChart from "../components/IndexChart";
import Strategy from "../components/Strategy";
import HotSector from "../components/HotSector";
import NewsTopics from '../components/NewsTopics';

export default function TopPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/fetch_latest_stock');
                setLoading(false);
                console.log(data)
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
                            <div className="row top">
                                <div class="col_2">
                                    <IndexChart />
                                    <Strategy />
                                </div>
                                <div class="col_1">
                                    <HotSector />
                                    <NewsTopics />
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}
