import React from 'react'
import {Line} from 'react-chartjs-2'

const data = {
    labels: ['12', '15', '18', '21', '4', '7'],
    datasets: [{
        label: 'Nikkei',
        data: [20000, 22000, 24000, 26000, 28000, 30000, 32000],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

export default function LineChart() {
    return (
        <div className="index_chart">
            <Line
                data={data}
            />
        </div>
    )
}
