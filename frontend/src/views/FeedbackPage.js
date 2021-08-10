import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function FeedbackPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = [];
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
                        <div>
                            <p>FeedbackPage</p>
                        </div>
                    )}
        </div>
    )
}
