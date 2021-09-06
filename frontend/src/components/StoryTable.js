import React, { useContext, useRef, useState } from 'react'
import "../styles/components/StoryTable.scss"
import PlanAddForm from './PlanAddForm'
import { context, actions } from '../stores/PlanPage'
import { helper } from '../utils/helper'

export default function StoryTable() {
    const { state, dispatch } = useContext(context);
    const { planData } = state
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const refs = useRef([])

    const handleSelect = (index) => {
        setShow(`tr_${index}`)
        dispatch({ type: actions.SET_SELECTED_STOCK, payload: planData[index] })
    }

    const handleSubmit = (index) => {
        const code = refs.current[index].querySelectorAll("td")[0].innerText
        const input = refs.current[index].querySelectorAll("input")
        const payload = {
            opening: input[0].value,
            support: input[1].value,
            losscut: input[2].value,
            goal: input[3].value,
        }
        helper.postData(`/api/update_plan/${code}`, dispatch, actions, payload)
        .then((data) => {
            dispatch({ type: actions.SET_PLAN, payload: data });
            dispatch({ type: actions.SET_SELECTED_STOCK, payload: data[index] })
        })
    }

    const handleDelete = (index) => {
        const code = refs.current[index].querySelectorAll("td")[0].innerText;
        const payload = { code: code }
        helper.postData('/api/delete_plan', dispatch, actions, payload)
        .then((data) => {
            dispatch({ type: actions.SET_PLAN, payload: data });
            dispatch({ type: actions.SET_SELECTED_STOCK, payload: null })
        })
    }
    return (
        <div className="story_table">
            <ul className="menu_button">
                <li onClick={() => { setOpen("add") }} >銘柄追加</li>
            </ul>
            {open === "add" && (<PlanAddForm setOpen={setOpen} />)}
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
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    {planData.length ? planData.map((stock, index) => {
                        return (
                            <tr id={`tr_${index}`} key={index} onClick={() => handleSelect(index)} ref={(el) => { refs.current[index] = el }} >
                                <td data-label="code">{stock.code}</td>
                                <td data-label="market">{stock.market}</td>
                                <td data-label="name">{stock.stockname}</td>
                                <td data-label="opening"><input key={stock.opening} defaultValue={stock.opening} /></td>
                                <td data-label="support"><input key={stock.support} defaultValue={stock.support} /></td>
                                <td data-label="losscut"><input key={stock.losscut} defaultValue={stock.losscut} /></td>
                                <td data-label="goal"><input key={stock.goal} defaultValue={stock.goal} /></td>
                                <td data-label="Submit" >{show === `tr_${index}` ? <i onClick={() => handleSubmit(index)} className="far fa-save"></i>:"---"}</td>
                                <td data-label="Delete" >{show === `tr_${index}` ? <i onClick={() => handleDelete(index)} className="fas fa-trash"></i> : "---"}</td>
                            </tr>
                        )
                    }):null}
                </tbody>
            </table>
        </div>
    )
}
