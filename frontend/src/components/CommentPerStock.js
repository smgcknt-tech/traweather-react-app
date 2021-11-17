import '../styles/components/CommentPerStock.scss';
import React, { useContext, useRef, useState } from 'react';
import { AppActions, AppContext } from '../AppStore';
import { helper } from '../utils/helper';

export default function CommentPerStock() {
  const { state, dispatch } = useContext(AppContext);
  const { user, selectedStock } = state;
  const [open, setOpen] = useState(false);
  const textarea = useRef(null);

  const handleSubmit = async () => {
    setOpen(false);
    const payload = {
      comment: textarea.current.value,
      result_id: selectedStock.result_id,
      user_id: user.id,
    };
    const updatedResultData = await helper.postData(`/api/result/update_comment`, dispatch, AppActions, payload);
    if (updatedResultData.rows) {
      dispatch({ type: AppActions.SET_RESULT, payload: updatedResultData.rows });
      const foundSelectedStock = updatedResultData.rows.find((result) => result.code === selectedStock.code);
      dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: foundSelectedStock });
    } else {
      alert(updatedResultData);
    }
  };
  if (!selectedStock) return null;
  return (
    <div
      className="comment_per_stock"
      onBlur={() => {
        setOpen(false);
      }}
    >
      <section>
        <h2 className="title">コメント</h2>
        <div className="content">
          <textarea
            key={selectedStock.comment}
            defaultValue={selectedStock.comment}
            placeholder="トレードの感想を入力..."
            onFocus={() => {
              setOpen(true);
            }}
            ref={textarea}
          ></textarea>
        </div>
        {open && (
          <div className="button">
            <span onMouseDown={handleSubmit}>保存</span>
          </div>
        )}
      </section>
    </div>
  );
}
