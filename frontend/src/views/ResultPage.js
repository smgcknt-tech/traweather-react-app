import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Message from '../components/Message';
import ResultList from '../components/ResultList';
import Reflection from '../components/Reflection';

export default function ResultPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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
                        <div className="row top">
                            <div className="col_2">
                                <ResultList/>
                            </div>
                            <div className="col_1">
                                <Reflection/>
                            </div>
                        </div>
                    )}
        </div>
    )
}
