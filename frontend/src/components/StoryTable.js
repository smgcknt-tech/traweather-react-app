import axios from 'axios'
import React, { useContext, useState } from 'react'
import { CurrentStock } from '../pages/PlanPage'
import PlanAddForm from './PlanAddForm'
import "../styles/components/StoryTable.scss"

export default function StoryTable(props) {
    const { data } = props
    const { stock,setStock } = useContext(CurrentStock)
    const [open, setOpen] = useState(null)
    const hundleStock = (index) => { setStock(data[index]) }
    const hundleOpen = (form) => {setOpen(form)}
    const handleBlur = (e) => {
        const key = e.target.name
        const value = e.target.value
        const payload = {[key]:value}
        const updatePlan = async()=>{
            const url = `/api/update_plan/${stock.code}`
            const { data } = await axios.post(url, payload)
            console.log(data);
        }
        updatePlan()

    };

    return (
        <div className="story_table">
            <ul className="add_button">
                <li onClick={() => hundleOpen("add_form")} >銘柄追加</li>
            </ul>
            {(open === "add_form") && (<PlanAddForm setOpen={setOpen}/>) }
            <table>
                <thead>
                    <th>証券コード</th>
                    <th>市場</th>
                    <th>銘柄名</th>
                    <th>始値</th>
                    <th>支持線</th>
                    <th>仕切値</th>
                    <th>目標値</th>
                </thead>
                <tbody>
                    {data?.map((stock, index) => {
                        return (
                            <tr key={index} onClick={() => hundleStock(index)}>
                                <td data-label="code">{stock.code}</td>
                                <td data-label="market">{stock.market}</td>
                                <td data-label="name">{stock.stockname}</td>
                                <td data-label="opening" onBlur={handleBlur}><input name="opening" value={ stock.opening }/></td>
                                <td data-label="support"><input value={stock.support}/></td>
                                <td data-label="loss_cut"><input value={stock.losscut} /></td>
                                <td data-label="goal"><input value={stock.goal} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
