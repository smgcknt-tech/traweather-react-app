import "../styles/components/ResultTable.scss"
import React, { useContext, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { AppActions, AppContext } from '../AppStore'
import { helper } from '../utils/helper'

export default function StoryTable() {
    const { state, dispatch } = useContext(AppContext);
    const { user, currentPage, resultData, selectedStock} = state
    const refs = useRef([])
    const [show, setShow] = useState(false)
    const rowsPerPage = 5;
    const pagesVisited = currentPage * rowsPerPage;
    const pageCount = Math.ceil(resultData?.length / rowsPerPage);
    const displayRows = resultData
        .slice(pagesVisited, pagesVisited + rowsPerPage)
        .map((stock, index) => {
            return (
                <tr id={`tr_${index}`} key={index} onClick={() => handleSelect(index)} ref={(el) => { refs.current[index] = el }} >
                    <td data-label="証券番号">{stock.code}</td>
                    <td data-label="市場">{stock.market}</td>
                    <td data-label="銘柄名">{stock.stock_name}</td>
                    <td data-label="LOT"><input key={stock.lot} defaultValue={stock.lot} /></td>
                    <td data-label="ENTRY"><input key={stock.entry_point} defaultValue={stock.entry_point} /></td>
                    <td data-label="EXIT"><input key={stock.exit_point} defaultValue={stock.exit_point} /></td>
                    <td data-label="上昇幅">{stock.profit_loss}</td>
                    <td data-label="上昇率">{stock.profit_loss_rate}</td>
                    <td data-label="合計損益額">{stock.total_profit_loss}</td>
                    <td id="submit">{show === `tr_${index}` ? <i onClick={(e) => handleSubmit(e, index)} className="far fa-save"></i> : "---"}</td>
                </tr>
            )
        })
    const changePage = ({ selected }) => {
        dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: selected });
    }

    const handleSelect = (index) => {
        setShow(`tr_${index}`)
        dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: resultData[pagesVisited + index] })
    }

    const handleSubmit = async (e, index) => {
        const lot = refs.current[index].querySelector("td[data-label='LOT'] > input ").value
        const entry_point = refs.current[index].querySelector("td[data-label='ENTRY'] > input ").value
        const exit_point = refs.current[index].querySelector("td[data-label='EXIT'] > input ").value
        if (Number(lot) === 0 || Number(entry_point) === 0 || Number(exit_point) === 0) {
            e.preventDefault();
            alert("入力項目が０の状態では保存できません。")
        } else {
            const payload = {
                lot: lot,
                entry_point: entry_point,
                exit_point: exit_point,
                result_id: selectedStock.result_id,
                user_id: user.id,
                date: helper.time().today
            }
            const response = await helper.postData(`/api/result/update_numbers`, dispatch, AppActions, payload)
            if (response) {
                dispatch({ type: AppActions.SET_RESULT, payload: response });
                dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: response[pagesVisited + index] })
                dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: pagesVisited / rowsPerPage });
            }
        }
    }

    return (
        <div className="result_table">
            <table>
                <thead>
                    <tr>
                        <th>証券コード</th>
                        <th>市場</th>
                        <th>銘柄名</th>
                        <th>ロット</th>
                        <th>ENTRY</th>
                        <th>EXIT</th>
                        <th>上昇幅</th>
                        <th>上昇率(%)</th>
                        <th>損益額</th>
                        <th>保存</th>
                    </tr>
                </thead>
                <tbody>
                    {resultData.length > 0 && displayRows}
                </tbody>
            </table>
            {resultData.length > 0 && (
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    pageCount={pageCount}
                    initialPage={currentPage}
                    onPageChange={changePage}
                    containerClassName={"pagination_bttns"}
                    previousLinkClassName={"previous_bttn"}
                    nextLinkClassName={"next_bttn"}
                    disabledClassName={"pagination_disabled"}
                    activeClassName={"pagination_active"}
                />
            )}
        </div>
    )
}
