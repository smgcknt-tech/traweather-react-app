import React, { useContext, useState } from 'react'
import PlanAddForm from './PlanAddForm'
import "../styles/components/StoryTable.scss"
import { context, actions } from '../stores/PlanPage'
import { helper } from '../utils/helper'

export default function StoryTable() {
    const { state, dispatch } = useContext(context);
    const { planData, selectedStock } = state
    const [open, setOpen] = useState(null)
    const hundleStock = (index) => {
        dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[index] })
    }

    const hundleSave = (e, index) => {
        const td = e.currentTarget.parentNode.querySelectorAll("#start ~ td")
        const payload = {
            opening: Number(td[0].querySelector('input').value),
            support: Number(td[1].querySelector('input').value),
            losscut: Number(td[2].querySelector('input').value),
            goal: Number(td[3].querySelector('input').value),
        }
        helper.postData(`/api/update_plan/${selectedStock.code}`, dispatch, actions,payload)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: data[index] })
            })
    }

    return (
        <div className="story_table">
            <ul className="menu_button">
                <li onClick={() => { setOpen("add")}} >銘柄追加</li>
            </ul>
            {(open === "add") && (<PlanAddForm setOpen={setOpen} />)}
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
                        <th>保存</th>
                    </tr>
                </thead>
                <tbody>
                    {planData.length ? planData.map((stock, index) => {
                        return (
                            <tr key={index} onClick={() => hundleStock(index)}>
                                <td data-label="code">{stock.code}</td>
                                <td data-label="market">{stock.market}</td>
                                <td data-label="name" id="start" >{stock.stockname}</td>
                                <td data-label="opening"><input name="opening" defaultValue={stock.opening} /></td>
                                <td data-label="support"><input defaultValue={stock.support} /></td>
                                <td data-label="losscut"><input defaultValue={stock.losscut} /></td>
                                <td data-label="goal"><input defaultValue={stock.goal} /></td>
                                <td data-label="save" onClick={(e) => hundleSave(e, index)} ><i className="far fa-save"></i></td>
                            </tr>
                        )
                    }) : null}
                </tbody>
            </table>
        </div>
    )
}
