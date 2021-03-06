import React, { useContext, useRef, useState } from 'react';
import { AppActions, AppContext } from '../AppStore';
import { helper } from '../utils/helper';
import '../styles/components/Reason.scss';

export default function Reason() {
    const { state, dispatch } = useContext(AppContext);
    const { user, selectedStock } = state;
    const [open, setOpen] = useState(false);
    const textarea = useRef(null);

    const handleSubmit = async () => {
        const payload = {
          reason: textarea.current.value,
          user_id: user.id,
          plan_id: selectedStock.plan_id,
        };
        const response = await helper.postData(`/api/plan/update_reason`, dispatch, AppActions,payload);
        if (response) {
            dispatch({ type: AppActions.SET_PLAN, payload: response });
            const foundSelectedStock = response.find((plan) => plan.code === selectedStock.code);
            dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: foundSelectedStock });
        };
        setOpen(false);
    };

    return (
        <div className="reason" onBlur={() => { setOpen(false) }}>
            <section>
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
            </section>
        </div>
    );
};
