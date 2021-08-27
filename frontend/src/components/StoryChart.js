import '../styles/components/StoryChart.scss'
import React, { useEffect, useState, useContext } from 'react'
import { CurrentStock } from '../pages/PlanPage'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
Chart.plugins.register([ChartAnnotation]);

export default function StoryChart(props) {
    const { stock } = useContext(CurrentStock)
    const [chartData, setChartData] = useState({})
    const {latestData} = props
    useEffect(() => {
        const chart = () => {
            setChartData({
                labels: ["opening", "support", "losscut", "goal"],
                datasets: [
                    {
                        yAxisID: "y-axis-1",
                        data: [stock.opening, stock.support, stock.losscut, stock.goal],
                        fill: 'start',
                        backgroundColor: "rgba(54,164,235,0.5)",
                        borderColor: 'rgba(153,102,255,1)',
                        borderWidth: 2,
                        tension: 0.1
                    }
                ]

            })
        }
        stock && chart()
    }, [stock])
    return (
        <>
            {(stock && latestData) && (
                <div className="story_chart">
                    <div className="chart_container">
                        <Line data={chartData} options={{
                            title: {
                                display: true,
                                text: `${latestData.stockdate} : ${latestData.stockname}`
                            },
                            legend: {
                                display: false
                            },
                            responsive: true,
                            scales: {
                                display: false,
                                ticks: {
                                    max:Number(latestData.upperrange),
                                    min: Number(latestData.lowerrange)
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
                                        value: latestData.price,
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
                                            xPadding:3,
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
                                        value: Number(latestData.low),
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
                                        value: Number(latestData.high),
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
                                        value: Number(latestData.vwap),
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
                </div>
            )}
        </>
    )
}
