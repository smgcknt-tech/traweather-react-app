import "../styles/components/StoryTable.scss"
import React, { useContext, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { AppActions, AppContext } from '../AppStore'
import { helper } from '../utils/helper'

export default function StoryTable() {
    const { state, dispatch } = useContext(AppContext);
    const { user, currentPage, planData } = state
    const refs = useRef([])
    const [show, setShow] = useState(false)
    const rowsPerPage = 5;
    const pagesVisited = currentPage * rowsPerPage;
    const pageCount = Math.ceil(planData?.length / rowsPerPage);

    const displayRows = planData
        .slice(pagesVisited, pagesVisited + rowsPerPage)
        .map((stock, index) => {
            return (
                <tr id={`tr_${index}`} key={index} onClick={() => handleSelect(index)} ref={(el) => { refs.current[index] = el }} >
                    <td data-label="証券番号">{stock.code}</td>
                    <td data-label="市場">{stock.market}</td>
                    <td data-label="銘柄名">{stock.stock_name}</td>
                    <td data-label="寄付値"><input key={stock.opening} defaultValue={stock.opening} /></td>
                    <td data-label="支持線"><input key={stock.support} defaultValue={stock.support} /></td>
                    <td data-label="仕切値"><input key={stock.losscut} defaultValue={stock.losscut} /></td>
                    <td data-label="目標値"><input key={stock.goal} defaultValue={stock.goal} /></td>
                    <td id="submit">{show === `tr_${index}` ? <i onClick={() => handleSubmit(index)} className="far fa-save"></i> : "---"}</td>
                    <td id="delete">{show === `tr_${index}` ? <i onClick={() => handleDelete(index)} className="fas fa-trash"></i> : "---"}</td>
                </tr>
            )
        })
    const changePage = ({ selected }) => {
        dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: selected });
    }
    const handleSelect = (index) => {
        setShow(`tr_${index}`)
        dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: planData[pagesVisited + index] })
    }
    const handleSubmit = async (index) => {
        const payload = {
            opening: refs.current[index].querySelector("td[data-label='寄付値'] > input ").value,
            support: refs.current[index].querySelector("td[data-label='支持線'] > input ").value,
            losscut: refs.current[index].querySelector("td[data-label='仕切値'] > input ").value,
            goal: refs.current[index].querySelector("td[data-label='目標値'] > input ").value,
            code: refs.current[index].querySelector("td[data-label='証券番号']").innerText,
            user_id: user.id,
        }
        const response = await helper.postData(`/api/plan/update_numbers`, dispatch, AppActions,  payload)
        if (response) {
            dispatch({ type: AppActions.SET_PLAN, payload: response });
            dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: response[pagesVisited + index] })
            dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: pagesVisited / rowsPerPage });
        }
    }

    const handleDelete = async (index) => {
        const code = refs.current[index].querySelectorAll("td")[0].innerText;
        const payload = {
            user_id: user.id,
            code: code,
        }
        const response = await helper.postData('/api/delete_plan', dispatch, AppActions, payload)
        if (response) {
            dispatch({ type: AppActions.SET_PLAN, payload: response });
            dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: response[index - 1]})
        }
    }
    return (
            <div className="story_table">
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
                            <th>保存</th>
                            <th>削除</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planData.length > 0 && displayRows}
                    </tbody>
                </table>
                {planData.length > 0 && (
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
