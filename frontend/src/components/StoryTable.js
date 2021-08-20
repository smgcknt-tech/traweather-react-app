import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/components/StoryTable.scss"

export default function StoryTable() {
    return (
        <div className="story_table">
            <table>
                <thead>
                    <th>証券コード</th>
                    <th>市場</th>
                    <th>銘柄名</th>
                    <th>始値</th>
                    <th>支持線</th>
                    <th>仕切値</th>
                    <th>目標値</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="ticker">8698</td>
                        <td data-label="market">東証１部</td>
                        <td data-label="name">マネックスG</td>
                        <td data-label="opening">680</td>
                        <td data-label="support">670</td>
                        <td data-label="loss_cut">660</td>
                        <td data-label="goal">700</td>
                        <td ><Link className="edit_button" to="/plan/edit">編集</Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
