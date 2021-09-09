import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../stores/App';
import { context, actions } from '../stores/PlanPage';
import '../styles/components/Strategy.scss'
import { helper } from '../utils/helper';

export default function Strategy() {
    const { state, dispatch } = useContext(context);
    const { selectedStock } = state;
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const handleSubmit = () => {
        setOpen(false)
        const payload = {
            strategy: textarea.current.value,
            user_id: user.id,
            code: selectedStock.code
        }
        helper.postData(`/api/update_plan_strategy`, dispatch, actions, payload)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data });
                const foundSelectedStock = data.find((plan) => plan.code === selectedStock.code)
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: foundSelectedStock })
            })
    }

    return (
        <div className="strategy" onBlur={() => { setOpen(false) }}>
            <h2 className="title">今日の戦略</h2>
            <div className="content">
                {selectedStock ? (
                    <textarea
                        key={selectedStock.strategy}
                        defaultValue={selectedStock.strategy}
                        onFocus={() => { setOpen(true) }}
                        ref={textarea}
                    >
                    </textarea>) : "データがありません"}
            </div>
            {open && <div className="button"><span onMouseDown={handleSubmit}>保存</span></div>}
        </div>
    )
}
