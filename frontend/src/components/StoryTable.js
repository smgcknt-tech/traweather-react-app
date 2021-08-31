import axios from 'axios'
import React, { useContext, useState } from 'react'
import PlanAddForm from './PlanAddForm'
import "../styles/components/StoryTable.scss"
import { context, actions } from '../stores/PlanPage'

export default function StoryTable() {
    const { state, dispatch } = useContext(context);
    const { planData, selectedStock } = state
    const [open, setOpen] = useState(null)
    const hundleStock = (index) => {
        console.log(planData)
        dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[index] })
    }
    const hundleOpen = (form) => { setOpen(form) }
    /*     const handleBlur = (e) => {
            const key = e.target.name
            const value = e.target.value
            const payload = {[key]:value}
            const updatePlan = async()=>{
                const url = `/api/update_plan/${selectedStock.code}`
                await axios.post(url, payload)
            }
            updatePlan()

        }; */
    return (
        <div className="story_table">
            <ul className="add_button">
                <li onClick={() => hundleOpen("add_form")} >銘柄追加</li>
            </ul>
            {(open === "add_form") && (<PlanAddForm setOpen={setOpen} />)}
            <table>
                <thead>
                    <tr>
                        <th>証券コード</th>
                        <th>市場</th>
                        <th>銘柄名</th>
                        <th>始値</th>
                        <th>支持線</th>
                        <th>仕切値</th>
                        <th>目標値</th>
                    </tr>
                </thead>
                <tbody>
                    {planData ? planData.map((stock, index) => {
                        return (
                            <tr key={index} onClick={() => hundleStock(index)}>
                                <td data-label="code">{stock.code}</td>
                                <td data-label="market">{stock.market}</td>
                                <td data-label="name">{stock.stockname}</td>
                                <td data-label="opening" /* onBlur={handleBlur} */><input name="opening" value={stock.opening} /></td>
                                <td data-label="support"><input value={stock.support} /></td>
                                <td data-label="loss_cut"><input value={stock.losscut} /></td>
                                <td data-label="goal"><input value={stock.goal} /></td>
                            </tr>
                        )
                    }) : "データなし"}
                </tbody>
            </table>
        </div>
    )
}
