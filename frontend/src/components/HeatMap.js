import React, { memo, useContext } from 'react';
import { AppContext } from '../AppStore';
import '../styles/components/HeatMap.scss';

export default memo(function HeatMap() {
    const { state } = useContext(AppContext);
    const { heatmapData } = state;

    const find = (market, range) => {
        const res = heatmapData.find((d) => d.market === market && d.range === range)
        if (!res) return '-'
        return res.avg;
    };

    return (
        <div className='heatmap'>
            <table>
                <thead>
                    <tr>
                        <th>市場</th>
                        <th>東証</th>
                        <th>東証一部</th>
                        <th>東証二部</th>
                        <th>東証マザ</th>
                        <th>JQS</th>
                        <th>JQG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>大型</th>
                        <td>{find('東証', '大型')}</td>
                        <td>{find('東証一部', '大型')}</td>
                        <td>{find('東証二部', '大型')}</td>
                        <td>{find('東証マザ', '大型')}</td>
                        <td>{find('JQS', '大型')}</td>
                        <td>{find('JQG', '大型')}</td>
                    </tr>
                    <tr>
                        <th>中型</th>
                        <td>{find('東証', '中型')}</td>
                        <td>{find('東証一部', '中型')}</td>
                        <td>{find('東証二部', '中型')}</td>
                        <td>{find('東証マザ', '中型')}</td>
                        <td>{find('JQS', '中型')}</td>
                        <td>{find('JQG', '中型')}</td>
                    </tr>
                    <tr>
                        <th>小型</th>
                        <td>{find('東証', '小型')}</td>
                        <td>{find('東証一部', '小型')}</td>
                        <td>{find('東証二部', '小型')}</td>
                        <td>{find('東証マザ', '小型')}</td>
                        <td>{find('JQS', '小型')}</td>
                        <td>{find('JQG', '小型')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
});
