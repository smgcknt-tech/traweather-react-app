import React from 'react'
import "../styles/components/StoryTable.scss"

export default function StoryTable() {
    return (
        <div className="story_table">
            <table>
                <thead>
                    <th>T</th>
                    <th>M</th>
                    <th>N</th>
                    <th>O</th>
                    <th>S</th>
                    <th>L</th>
                    <th>R</th>
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
                        <td data-label="ressistance">700</td>
                        <td data-label="action">編集</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
