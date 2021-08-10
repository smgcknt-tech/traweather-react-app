
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
                const { data } = await axios.get('');
                setLoading(false);

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
                                <div className="col_2">
                                    <IndexChart />
                                    <Strategy />
                                </div>
                                <div className="col_1">
                                    <HotSector />
                                    <NewsTopics />
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}
