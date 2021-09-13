import "../styles/components/ResultTable.scss"
import React, { useContext, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { context, actions } from '../stores/ResultPage'
import { AppContext } from '../stores/App'
import { helper } from '../utils/helper'

export default function StoryTable() {
    const { state, dispatch } = useContext(context);
    const { currentPage, resultData } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState
    const refs = useRef([])
    const [show, setShow] = useState(false)
    const rowsPerPage = 5;
    const pagesVisited = currentPage * rowsPerPage;
    const pageCount = Math.ceil(resultData?.length / rowsPerPage);

    const displayRows = resultData
        .slice(pagesVisited, pagesVisited + rowsPerPage)
        .map((stock, index) => {
            return (
                <tr id={`tr_${index}`} key={index} ref={(el) => { refs.current[index] = el }} >
                    <td data-label="証券番号">{stock.code}</td>
                    <td data-label="市場">{stock.market}</td>
                    <td data-label="銘柄名">{stock.stock_name}</td>
                    <td data-label="寄付値"><input key={stock.opening} defaultValue={stock.opening} /></td>
                    <td data-label="支持線"><input key={stock.support} defaultValue={stock.support} /></td>
                    <td data-label="仕切値"><input key={stock.losscut} defaultValue={stock.losscut} /></td>
                    <td data-label="目標値"><input key={stock.goal} defaultValue={stock.goal} /></td>
                    <td data-label="ENTRY"><input key={stock.entry_point} defaultValue={stock.entry_point} /></td>
                    <td data-label="EXIT"><input key={stock.exit_point} defaultValue={stock.exit_point} /></td>
                    <td data-label="損益"><input key={stock.profit_loss} defaultValue={stock.profit_loss} /></td>
                    <td data-label="損益率"><input key={stock.profit_loss_rate} defaultValue={stock.profit_loss_rate} /></td>
                    <td id="submit">{show === `tr_${index}` ? <i className="far fa-save"></i> : "---"}</td>
                </tr>
            )
        })
    const changePage = ({ selected }) => {
        dispatch({ type: actions.SET_CURRENT_PAGE, payload: selected });
    }

    return (
        <div className="result_table">
            <table>
                <thead>
                    <tr>
                        <th>証券コード</th>
                        <th>市場</th>
                        <th>銘柄名</th>
                        <th>寄付値</th>
                        <th>支持線</th>
                        <th>仕切値</th>
                        <th>目標値</th>
                        <th>ENTRY</th>
                        <th>EXIT</th>
                        <th>損益</th>
                        <th>損益率</th>
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
