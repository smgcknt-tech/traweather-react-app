import '../styles/components/Strategy.scss'
import React, { useContext, useRef, useState } from 'react'
import { AppActions, AppContext } from '../AppStore';
import { helper } from '../utils/helper';

export default function Strategy() {
    const { state, dispatch } = useContext(AppContext);
    const { user, selectedStock } = state
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const handleSubmit = async () => {
        setOpen(false)
        const payload = {
            strategy: textarea.current.value,
            user_id: user.id,
            code: selectedStock.code
        }
        const response = await helper.postData(`/api/update_plan_strategy`, dispatch, AppActions, payload)
        if (response) {
            dispatch({ type: AppActions.SET_PLAN, payload: response });
            const foundSelectedStock = response.find((plan) => plan.code === selectedStock.code)
            dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: foundSelectedStock })
        }
    }

    return (
        <div className="strategy" onBlur={() => { setOpen(false) }}>
            <section>
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
            </section>
        </div>
    )
}
