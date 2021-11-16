import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../AppStore';
import '../styles/components/ComparisonChart.scss';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import ComparisonTable from './ComparisonTable';
Chart.plugins.register([ChartAnnotation]);

export default function ComparisonChart() {
  const { state } = useContext(AppContext);
  const { selectedStock, resultIndicators } = state;
  const { stockData } = resultIndicators;
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (selectedStock && stockData) {
      (async () => {
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
      })();
    }
  }, [selectedStock, stockData]);

  if (!chartData) return null;
  return (
      <div className="comparison_chart">
        <div className="chart_container">
          <Line
            data={chartData}
            options={{
              title: {
                display: true,
                text: `${stockData.stock_name} (${stockData.market}) [${stockData.industry}]`,
              },
              legend: {
                display: false,
              },
              responsive: true,
              scales: {
                display: true,
                yAxes: [
                  {
                    ticks: {
                      display: true,
                      suggestedMin: selectedStock.losscut - 100,
                      suggestedMax: selectedStock.exit_point + 100,
                    },
                    id: 'y-axis-1',
                  },
                ],
              },
              annotation: selectedStock.entry_point > 0 &&
                selectedStock.exit_point > 0 && {
                  annotations: [
                    {
                      type: 'line',
                      scaleID: 'y-axis-1',
                      drawTime: 'afterDatasetsDraw',
                      mode: 'horizontal',
                      value: selectedStock.entry_point,
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
                        content: 'ENTRY',
                      },
                    },
                    {
                      type: 'line',
                      scaleID: 'y-axis-1',
                      drawTime: 'afterDatasetsDraw',
                      mode: 'horizontal',
                      value: Number(selectedStock.exit_point),
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
                        content: 'EXIT',
                      },
                    },
                  ],
                },
            }}
          />
        </div>
        <ComparisonTable />
      </div>
    );
}
