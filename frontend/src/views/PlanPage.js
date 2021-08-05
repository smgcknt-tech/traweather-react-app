import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading';
import Message from '../components/Message';
import CandidateList from '../components/CandidateList';
import StoryChart from "../components/StoryChart";
import StoryText from '../components/StoryText';
import Reason from '../components/Reason';

export default function TopPage() {
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
                        <div>
                            <CandidateList />
                            <div className="row top">
                                <div className="col_2">
                                    <StoryChart />
                                </div>
                                <div className="col_1">
                                    <StoryText />
                                    <Reason />
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}
