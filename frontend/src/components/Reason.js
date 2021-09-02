import React, { useContext, useEffect, useRef, useState } from 'react'
import { context, actions } from '../stores/PlanPage';
import '../styles/components/Reason.scss'
import { helper } from '../utils/helper';

export default function Reason() {
    const { state, dispatch } = useContext(context);
    const { selectedStock,planData } = state;
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(null)
    const textarea = useRef(null)

    const hundleSave = () => {
        setOpen(false)
        const payload = { reason: textarea.current.value }
        helper.postData(`/api/update_plan_reason/${selectedStock.code}`, dispatch, actions, payload)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                const newSelectedStock = data.find((plan) => plan.code === selectedStock.code)
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: newSelectedStock })
            })
    }

    useEffect(()=>{
        setContent(selectedStock?.reason)
    }, [selectedStock])

    return (
        <div className="reason">
            <div>
                <h2 className="title">選定理由</h2>
                <div className="content">
                    {planData.length ? (
                    <textarea
                        defaultValue={content}
                        onFocus={() => { setOpen(true) }}
                        ref={textarea}
                    >
                        </textarea>) : "データがありません"}
                </div>
            </div>
            {open && <div className="button"><span onClick={hundleSave}>保存</span></div>}
        </div>
    )
}
