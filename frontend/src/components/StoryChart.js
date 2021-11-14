import React, { useEffect, useState, useContext } from 'react';
import { helper } from '../utils/helper';
import { AppContext } from '../AppStore';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import '../styles/components/StoryChart.scss';
Chart.plugins.register([ChartAnnotation]);

export default function StoryChart() {
  const { state } = useContext(AppContext);
  const { selectedStock, indicators } = state;
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    const chart = () => {
      selectedStock &&
        indicators &&
        setChartData({
          labels: ['寄付', '支持', '仕切', '利確'],
          datasets: [
            {
              yAxisID: 'y-axis-1',
              data: [selectedStock.opening, selectedStock.support, selectedStock.losscut, selectedStock.goal],
              fill: 'start',
              backgroundColor: 'rgba(54,164,235,0.5)',
              borderColor: 'rgba(153,102,255,1)',
              borderWidth: 2,
              tension: 0.1,
            },
          ],
        });
    };
    chart();
  }, [selectedStock, indicators]);

  return (
    <>
      {selectedStock && indicators && (
        <div className="story_chart">
          <div className="chart_container">
            <Line
              data={chartData}
              options={{
                title: {
                  display: true,
                  text: `${indicators.stock_name} (${indicators.market}) [${indicators.industry}]`,
                },
                legend: {
                  display: false,
                },
                responsive: true,
                scales: {
                  display: false,

                  yAxes: [
                    {
                      id: 'y-axis-1',
                      ticks: {
                        suggestedMin: selectedStock.opening - 100,
                        suggestedMax: selectedStock.goal + 100,
                      },
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
                        content: '現在値',
                      },
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
                        content: '前日安値',
                      },
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
                        content: '前日高値',
                      },
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
                        content: '前日VWAP',
                      },
                    },
                  ],
                },
              }}
            />
          </div>
          <div className="indicators_table">
            <table>
              <tbody>
                <tr className="date">
                  <th className="date">{helper.format_dates(indicators.stock_date)}</th>
                </tr>
                <tr>
                  <th>現在値</th>
                  <td>{indicators.price} 円</td>
                </tr>
                <tr>
                  <th>前日比</th>
                  <td>
                    {indicators.change} 円 ({indicators.change_in_percent}%)
                  </td>
                </tr>
                <tr>
                  <th>始値</th>
                  <td>{indicators.opening} 円</td>
                </tr>
                <tr>
                  <th>高値</th>
                  <td>{indicators.high} 円</td>
                </tr>
                <tr>
                  <th>安値</th>
                  <td>{indicators.low} 円</td>
                </tr>
                <tr>
                  <th>前日終値</th>
                  <td>{indicators.previous_close} 円</td>
                </tr>
                <tr>
                  <th>VWAP</th>
                  <td>{indicators.vwap} 円</td>
                </tr>
                <tr>
                  <th>出来高</th>
                  <td>{indicators.volume} 円</td>
                </tr>
                <tr>
                  <th>出来高増加率</th>
                  <td>{indicators.volume_in_percent} 円</td>
                </tr>
                <tr>
                  <th>年初来高値</th>
                  <td>{indicators.year_high} 円</td>
                </tr>
                <tr>
                  <th>年初来安値</th>
                  <td>{indicators.year_low} 円</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
