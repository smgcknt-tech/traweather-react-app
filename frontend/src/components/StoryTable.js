import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CurrentStock } from '../pages/PlanPage'
import "../styles/components/StoryTable.scss"

export default function StoryTable(props) {
    const { data } = props
    const { setStock } = useContext(CurrentStock)
    const hundleStock = (index) => { setStock(data[index]) }
    return (
        <div className="story_table">
            <div className="add_button"><Link to={{
                pathname: '/plan/add',
            }}>銘柄追加</Link></div>
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
                    {data?.map((stock, index) => {
                        return (
                            <tr key={index} onClick={() => hundleStock(index)}>
                                <td data-label="code">{stock.code}</td>
                                <td data-label="market">{stock.market}</td>
                                <td data-label="name">{stock.stockname}</td>
                                <td data-label="opening">{stock.opening}</td>
                                <td data-label="support">{stock.support}</td>
                                <td data-label="loss_cut">{stock.losscut}</td>
                                <td data-label="goal">{stock.goal}</td>
                                <td ><Link className="edit_button" to={{
                                    pathname: '/plan/edit',
                                    props:stock,
                                }}>編集</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
