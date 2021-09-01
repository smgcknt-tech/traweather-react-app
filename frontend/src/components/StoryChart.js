import '../styles/components/StoryChart.scss'
import React, { useEffect, useState, useContext } from 'react'
import { context } from '../stores/PlanPage';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
Chart.plugins.register([ChartAnnotation]);
export default function StoryChart() {
    const { state } = useContext(context);
    const { selectedStock, indicators } = state;
    const [chartData, setChartData] = useState({})
    useEffect(() => {
        const chart = () => {
            setChartData({
                labels: ["opening", "support", "losscut", "goal"],
                datasets: [
                    {
                        yAxisID: "y-axis-1",
                        data: [selectedStock.opening, selectedStock.support, selectedStock.losscut, selectedStock.goal],
                        fill: 'start',
                        backgroundColor: "rgba(54,164,235,0.5)",
                        borderColor: 'rgba(153,102,255,1)',
                        borderWidth: 2,
                        tension: 0.1
                    }
                ]

            })
        }
        selectedStock && chart()
    }, [selectedStock])
    return (
        <div className="story_chart">
            {(selectedStock && indicators) ? (
                <div className="chart_container">
                    <Line data={chartData} options={{
                        title: {
                            display: true,
                            text: `${indicators.stockdate} : ${indicators.stockname}`
                        },
                        legend: {
                            display: false
                        },
                        responsive: true,
                        scales: {
                            display: false,
                            ticks: {
                                max: Number(indicators.upperrange),
                                min: Number(indicators.lowerrange)
                            },
                            yAxes: [
                                {
                                    id: "y-axis-1",

                                },

                            ],
                        },
                        annotation: {
                            annotations: [
                                {
                                    type: 'line',
                                    scaleID: 'y-axis-1',
                                    drawTime: 'afterDatasetsDraw',
                                    mode: 'horizontal',
                                    value: indicators.price,
                                    borderColor: 'black',
                                    borderWidth: 3,
                                    borderDash: [2, 2],
                                    borderDashOffset: 1,
                                    label: {
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        bordercolor: 'rgba(200,60,60,0.8)',
                                        borderwidth: 2,
                                        fontSize: 10,
                                        fontStyle: 'bold',
                                        fontColor: 'rgba(200,60,60,0.8)',
                                        xPadding: 3,
                                        yPadding: 3,
                                        cornerRadius: 3,
                                        position: 'left',
                                        xAdjust: 0,
                                        yAdjust: 0,
                                        enabled: true,
                                        content: '現在値'
                                    }
                                },
                                {
                                    type: 'line',
                                    scaleID: 'y-axis-1',
                                    drawTime: 'afterDatasetsDraw',
                                    mode: 'horizontal',
                                    value: Number(indicators.low),
                                    borderColor: 'black',
                                    borderWidth: 3,
                                    borderDash: [2, 2],
                                    borderDashOffset: 1,
                                    label: {
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        bordercolor: 'rgba(200,60,60,0.8)',
                                        borderwidth: 2,
                                        fontSize: 10,
                                        fontStyle: 'bold',
                                        fontColor: 'rgba(200,60,60,0.8)',
                                        xPadding: 3,
                                        yPadding: 3,
                                        cornerRadius: 3,
                                        position: 'right',
                                        xAdjust: 0,
                                        yAdjust: 0,
                                        enabled: true,
                                        content: '前日安値'
                                    }
                                },
                                {
                                    type: 'line',
                                    scaleID: 'y-axis-1',
                                    drawTime: 'afterDatasetsDraw',
                                    mode: 'horizontal',
                                    value: Number(indicators.high),
                                    borderColor: 'black',
                                    borderWidth: 3,
                                    borderDash: [2, 2],
                                    borderDashOffset: 1,
                                    label: {
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        bordercolor: 'rgba(200,60,60,0.8)',
                                        borderwidth: 2,
                                        fontSize: 10,
                                        fontStyle: 'bold',
                                        fontColor: 'rgba(200,60,60,0.8)',
                                        xPadding: 3,
                                        yPadding: 3,
                                        cornerRadius: 3,
                                        position: 'left',
                                        xAdjust: 0,
                                        yAdjust: 0,
                                        enabled: true,
                                        content: '前日高値'
                                    }
                                },
                                {
                                    type: 'line',
                                    scaleID: 'y-axis-1',
                                    drawTime: 'afterDatasetsDraw',
                                    mode: 'horizontal',
                                    value: Number(indicators.vwap),
                                    borderColor: 'black',
                                    borderWidth: 3,
                                    borderDash: [2, 2],
                                    borderDashOffset: 1,
                                    label: {
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        bordercolor: 'rgba(200,60,60,0.8)',
                                        borderwidth: 2,
                                        fontSize: 10,
                                        fontStyle: 'bold',
                                        fontColor: 'rgba(200,60,60,0.8)',
                                        xPadding: 3,
                                        yPadding: 3,
                                        cornerRadius: 3,
                                        position: 'right',
                                        xAdjust: 0,
                                        yAdjust: 0,
                                        enabled: true,
                                        content: '前日VWAP'
                                    }
                                },
                            ]
                        }
                    }} />
                </div>
            ) : "データがありません"}
        </div>
    )
}
