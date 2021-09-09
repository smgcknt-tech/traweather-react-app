import React, { useContext, useRef, useState } from 'react'
import { context, actions } from '../stores/PlanPage';
import '../styles/components/Reason.scss'
import { helper } from '../utils/helper';

export default function Reason() {
    const { state, dispatch } = useContext(context);
    const { selectedStock } = state;
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const handleSubmit = () => {
        setOpen(false)
        const payload = { reason: textarea.current.value }
        helper.postData(`/api/update_plan_reason/${selectedStock.code}`, dispatch, actions, payload)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                const foundSelectedStock = data.find((plan) => plan.code === selectedStock.code)
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: foundSelectedStock })
            })
    }

    return (

        <div className="reason" onBlur={() => { setOpen(false) }}>
            <h2 className="title">選定理由</h2>
            <div className="content">
                {selectedStock ? (
                    <textarea
                        key={selectedStock.reason}
                        defaultValue={selectedStock.reason}
                        onFocus={() => { setOpen(true) }}
                        ref={textarea}
                    >
                    </textarea>
                ) : "データがありません"}
            </div>
            {open && (
                <div className="button"><span onMouseDown={handleSubmit}>保存</span></div>
            )}
        </div>

    )
}
