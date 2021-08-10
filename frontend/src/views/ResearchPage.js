
import React, { useEffect, useState } from 'react'
import "../styles/views/ResearchPage.scss";
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';

export default function ResearchPage() {
    const [stockLIst, setStockList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/fetch_latest_stock');
                setLoading(false);
                setStockList(data);
                //console.log(stockData)
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
                        <div className="research_page">
                            <SearchBar stockList={stockLIst} />
                        </div>
                    )}
        </div>
    )
}
