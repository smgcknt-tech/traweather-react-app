import React from 'react'
import "../styles/components/CandidateList.scss"


export default function Strategy() {
    return (
        <div className="candidate_list">
            <table>
                <thead>
                    <th>ticker</th>
                    <th>market</th>
                    <th>name</th>
                    <th>opening</th>
                    <th>support</th>
                    <th>loss_cut</th>
                    <th>registance</th>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="ticker">8698</td>
                        <td data-label="market">東証１部</td>
                        <td data-label="name">マネックスG</td>
                        <td data-label="opening">680</td>
                        <td data-label="support">670</td>
                        <td data-label="loss_cut">660</td>
                        <td data-label="ressistance">700</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
