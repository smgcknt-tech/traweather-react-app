import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Indicator from "../components/Indicator";

export default function TopPage() {
    const [indicators, setIndicators] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/indicators');
            setIndicators(data);
        };
        fetchData();
    },[]);
    return (
        <div>
            <div className="row center">
                {indicators.map((indicator) => {
                    return <Indicator indicator={indicator}></Indicator>
                })}
            </div>
        </div>
    )
}
