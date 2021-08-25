import '../styles/components/StoryChart.scss'
import React, { useEffect, useState, useContext } from 'react'
import { CurrentStock } from '../pages/PlanPage'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
Chart.plugins.register([ChartAnnotation]);

export default function StoryChart() {
    const { stock } = useContext(CurrentStock)
    const [chartData, setChartData] = useState({})
    useEffect(() => {
        const chart = () => {
            setChartData({
                labels: ["opening", "support", "losscut", "goal"],
                datasets: [
                    {
                        label: "ストーリーチャート",
                        data: [stock.opening, stock.support, stock.losscut, stock.goal],
                        fill: 'start',
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'rgba(153,102,255,1)',
                        borderWidth: 5,
                        tension: 0.3
                    }
                ]

            })
        }
        stock && chart()
    }, [stock])
    return (
        <>
            {stock && (
                <div className="story_chart">
                    <div className="chart_container">
                        <Line data={chartData} options={{
                            responsive: true,
                            scales: {
                                yAxes: [
                                    {
                                        id: 'y-axis-1',


                                    },
                                    {
                                        id: 'y-axis-2',
                                        ticks: {
                                            display: false,
                                        },

                                    }

                                ],
                            },
                            annotation: {
                                annotations: [
                                    {
                                        type: 'line',
                                        scaleID: 'y-axis-1',
                                        id: 'a-line-1',
                                        drawTime: 'afterDatasetsDraw',
                                        mode: 'horizontal',
                                        value: 1200,
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
                                            xPadding: 10,
                                            yPadding: 10,
                                            cornerRadius: 3,
                                            position: 'left',
                                            xAdjust: 0,
                                            yAdjust: 0,
                                            enabled: true,
                                            content: '始値'
                                        }
                                    },
                                    {
                                        type: 'line',
                                        scaleID: 'y-axis-2',
                                        id: 'a-line-2',
                                        drawTime: 'afterDatasetsDraw',
                                        mode: 'horizontal',
                                        value: 1100,
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
                                            xPadding: 10,
                                            yPadding: 10,
                                            cornerRadius: 3,
                                            position: 'left',
                                            xAdjust: 0,
                                            yAdjust: 0,
                                            enabled: true,
                                            content: '始値'
                                        }
                                    },
                                ]
                            }

                        }} />
                    </div>
                </div>
            )}
        </>
    )
}
