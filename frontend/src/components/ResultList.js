import React from 'react'
import "../styles/components/ResultList.scss"


export default function ResultList() {
    return (
        <div className="result_list">
            <table>
                <thead>
                    <th>ticker</th>
                    <th>market</th>
                    <th>name</th>
                    <th>prev_close</th>
                    <th>prev_high</th>
                    <th>flashing</th>
                    <th>board_830</th>
                    <th>board_850</th>
                    <th>open</th>
                    <th>profit_rate</th>
                    <th>max_pr</th>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="ticker">8698</td>
                        <td data-label="market">東証１部</td>
                        <td data-label="name">マネックスG</td>
                        <td data-label="prev_close">680</td>
                        <td data-label="prev_high">698</td>
                        <td data-label="flashing">激滅</td>
                        <td data-label="board_830">23435/56743/4321/7642</td>
                        <td data-label="board_850">45975/76423/34853/23522</td>
                        <td data-label="open">670</td>
                        <td data-label="profit_rate">3%</td>
                        <td data-label="max_pr">4.3%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
