import React, { useContext, useRef, useState } from 'react'
import { context,actions } from '../stores/PlanPage';
import '../styles/components/Strategy.scss'
import { helper } from '../utils/helper';

export default function Strategy() {
    const { state, dispatch } = useContext(context);
    const { selectedStock } = state;
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const hundleFocus = () => {
        setOpen(true)
    }

    const hundleSave = () => {
        setOpen(false)
        const payload = { strategy: textarea.current.value }
        helper.postData(`/api/update_plan_strategy/${selectedStock.code}`, dispatch, actions, payload)
            .then((data) => {
                const CurrentStock = data.find(x => x.code === selectedStock.code)
                dispatch({ type: actions.SET_PLAN, payload: data });
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: CurrentStock });
            })

    }
    return (
        <div className="strategy">
            <h2 className="title">今日の戦略</h2>
            <div className="content">
                {selectedStock ?
                    <textarea
                        defaultValue={selectedStock.strategy}
                        onFocus={hundleFocus}
                        ref={textarea}
                    >
                    </textarea> : "no data"}
            </div>
            {open && <div className="button"><span onClick={hundleSave}>保存</span></div>}
        </div>
    )
}
