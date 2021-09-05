import React, { useContext, useRef, useState } from 'react'
import { context, actions } from '../stores/PlanPage';
import '../styles/components/Strategy.scss'
import { helper } from '../utils/helper';

export default function Strategy() {
    const { state, dispatch } = useContext(context);
    const { selectedStock} = state;
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const handleSubmit = () => {
        setOpen(false)
        const payload = { strategy: textarea.current.value }
        helper.postData(`/api/update_plan_strategy/${selectedStock.code}`, dispatch, actions, payload)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                const newSelectedStock = data.find((plan) => plan.code === selectedStock.code)
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: newSelectedStock })
            })
    }

    return (
        <div className="strategy" onBlur={() => {setOpen(false)}}>
            <h2 className="title">今日の戦略</h2>
            <div className="content">
                {selectedStock ?(
                <textarea
                    key={selectedStock.strategy}
                    defaultValue={selectedStock.strategy}
                    onFocus={() => { setOpen(true) }}
                    ref={textarea}
                >
                </textarea>):"データがありません"}
            </div>
            {open && <div className="button"><span onMouseDown={handleSubmit}>保存</span></div>}
        </div>
    )
}
