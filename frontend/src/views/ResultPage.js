import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';
import ResultList from '../components/ResultList';
import Reflection from '../components/Reflection';

export default function ResultPage() {
    const [indicators, setIndicators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = [];
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
                        <div className="row top">
                            <div className="col_main">
                                <ResultList/>
                            </div>
                            <div className="col_sub">
                                <Reflection/>
                            </div>
                        </div>
                    )}
        </div>
    )
}
