import '../styles/components/CommentPerStock.scss'
import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../stores/App';
import { context, actions } from '../stores/ResultPage';
import { helper } from '../utils/helper';

export default function CommentPerStock() {
    const { state, dispatch } = useContext(context);
    const { selectedStock } = state;
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState
    const [open, setOpen] = useState(false)
    const textarea = useRef(null)

    const handleSubmit = async () => {
        setOpen(false)
        const payload = {
            comment: textarea.current.value,
            result_id: selectedStock.result_id,
            user_id: user.id,
        }
        const response = await helper.postData(`/api/update_result_comment`, dispatch, actions, payload)
        if (response) {
            dispatch({ type: actions.SET_RESULT, payload: response });
            const foundSelectedStock = response.find((result) => result.code === selectedStock.code)
            dispatch({ type: actions.SET_SELECTED_STOCK, payload: foundSelectedStock })
        }
    }

    return (
        <div className="comment_per_stock" onBlur={() => { setOpen(false) }}>
            <h2 className="title">コメント</h2>
            <div className="content">
                {selectedStock ? (
                    <textarea
                        key={selectedStock.comment}
                        defaultValue={selectedStock.comment}
                        onFocus={() => { setOpen(true) }}
                        ref={textarea}
                    >
                    </textarea>) : "データがありません"}
            </div>
            {open && <div className="button"><span onMouseDown={handleSubmit}>保存</span></div>}
        </div>
    )
}
