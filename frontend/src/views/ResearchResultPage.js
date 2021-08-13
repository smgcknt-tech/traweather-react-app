import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Indicators from '../components/Indicators';

export default function ResearchResult() {
    let { code } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedStockData, setSelctedStockData] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/fetch_latest_stock/${code}`);
                setLoading(false);
                setSelctedStockData(data[0]);
            } catch (err) {
                setError(err.message)
                setLoading(false);
            }
        })();
    }, []);
    return (
        <div>
            {loading ? (<Loading />)
                : error ? (<Message variant="error">{error}</Message>)
                    : (
                        <div><Indicators {...selectedStockData} /></div>
                    )}
        </div>
    )
}
