import React, { useContext, useRef, useState } from 'react'
import { context, actions } from '../stores/PlanPage';
import '../styles/components/Reason.scss'
import { helper } from '../utils/helper';

export default function Reason() {
    const { state, dispatch } = useContext(context);
    const { selectedStock } = state;
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const hundleFocus = () => {
        setOpen(true)
    }

    const hundleSave = () => {
        setOpen(false)
        const payload = {reason:textarea.current.value}
        helper.postData(`/api/update_plan_reason/${selectedStock.code}`, dispatch, actions, payload)
            .then((data) => {
                const currentStock = data.find(x => x.code === selectedStock.code)
                dispatch({ type: actions.SET_PLAN, payload: data });
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: currentStock });
            })

    }
    return (
        <div className="reason">
            <div>
                <h2 className="title">選定理由</h2>
                <div className="content">
                    {selectedStock ?
                        <textarea
                            defaultValue={selectedStock.reason}
                            onFocus={hundleFocus}
                            ref={textarea}
                        >
                        </textarea> : "no data"}
                </div>
            </div>
            {open && <div className="button"><span onClick={hundleSave}>保存</span></div>}
        </div>
    )
}
