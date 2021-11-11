import React from 'react'
import '../styles/components/HeatMap.scss';

export default function heatMap() {
    return (
        <div className='heatmap'>
            <table>
                <thead>
                    <tr>
                        <th>型/業種</th>
                        <th>industory</th>
                        <th>industory</th>
                        <th>industory</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><th>大型</th>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>
                    <tr><th>中型</th>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>
                    <tr><th>小型</th>
                        <td>1234</td>
                        <td>1234</td>
                        <td>1234</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
