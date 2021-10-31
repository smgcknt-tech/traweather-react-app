import '../../src/styles/pages/ReflectionPage.scss'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { AppContext, AppActions } from '../AppStore'
import { helper } from '../utils/helper';
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import ReactPaginate from 'react-paginate';

export default function ReflectionPage() {
    const { state, dispatch} = useContext(AppContext);
    const { user, loading, error, resultData, selectedStock, posts, selectedPost, currentPage, prediction} = state;
    const refs = useRef([])
    const rowsPerPage = 5;
    const pagesVisited = currentPage * rowsPerPage;
    const pageCount = Math.ceil(resultData?.length / rowsPerPage);

    useEffect(() => {
        if (user.id) {
            (async () => {
                const data = await helper.fetchData(`/api/feed_back`, dispatch, AppActions, { user_id: user.id })
                if (data) dispatch({ type: AppActions.SET_POSTS, payload: data });
            })()
        }
    }, [user.id]);// eslint-disable-line

    const handleClick = async (e, i, date) => {
        const fetchedPrediction = await helper.fetchData(`/api/prediction`, dispatch, AppActions, { user_id: user.id, date: date })
        const fetchedResult = await helper.fetchData(`/api/one_result`, dispatch, AppActions, { user_id: user.id, date: date });
        if (fetchedPrediction) {
            dispatch({ type: AppActions.SET_RESULT, payload: fetchedResult });
        }
        if (fetchedResult) {
            dispatch({ type: AppActions.SET_PREDICTION, payload: fetchedPrediction })
            dispatch({ type: AppActions.SET_SELECTED_POST, payload: posts[i] });
        }
    }
    const displayRows = resultData
        .slice(pagesVisited, pagesVisited + rowsPerPage)
        .map((stock, index) => {
            return (
                <tr id={`tr_${index}`} key={index} onClick={() => handleSelect(index)} ref={(el) => { refs.current[index] = el }} >
                    <td data-label="証券番号">{stock.code}</td>
                    <td data-label="市場">{stock.market}</td>
                    <td data-label="銘柄名">{stock.stock_name}</td>
                    <td data-label="LOT">{stock.lot}</td>
                    <td data-label="ENTRY">{stock.entry_point}</td>
                    <td data-label="EXIT">{stock.exit_point}</td>
                    <td data-label="上昇幅">{stock.profit_loss}</td>
                    <td data-label="上昇率">{stock.profit_loss_rate}</td>
                    <td data-label="合計損益額">{stock.total_profit_loss}</td>
                </tr>
            )
        })

    const changePage = ({ selected }) => {
        dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: selected });
    }

    const handleSelect = (index) => {
        dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: resultData[pagesVisited + index] })
    }

    const profitResult = useMemo(() => {
        return resultData
            .map((result) => { return result.total_profit_loss })
            .reduce((a, x) => a += x, 0);
    }, [resultData])

    const profit_loss_rate = useMemo(() => {
        return resultData
            .map((result) => { return result.profit_loss_rate })
            .reduce((a, x) => a += x, 0);
    }, [resultData])

    const archives = posts.map((post, index) => {
        const { title, image_url, created_at } = post
        const date = created_at.split('T')[0]
        return (
            <div className="post" key={index} onClick={(e) => { handleClick(e, index, date) }}>
                <div className="post_header">
                    <div>{date}</div>
                    <h2>{title}</h2>
                </div>
                <img src={`${image_url}`} alt="thumbnail" />
            </div>
        )
    })

    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    if (archives.length === 0) return <Message>振返データがありません!</Message>
    return (
        <div className="reflection_page">
            {!selectedPost && <div className="reflection_container">{archives}</div>}
            {selectedPost && (
                <div className="description_container">
                    <i className="fas fa-undo-alt" onClick={() => { dispatch({ type: AppActions.SET_SELECTED_POST, payload: null }); }}> 戻る </i>
                    <div className="indicators">
                        <div className="total_profit">
                            <div className="card_value">{profitResult}円</div>
                            <div className="card_title">損益合計</div>
                        </div>
                        <div className="profit_loss_rate">
                            <div className="card_value">{profit_loss_rate}%</div>
                            <div className="card_title">平均利確率</div>
                        </div>
                    </div>
                    <div className="feed_back">
                        <h2>{selectedPost.title}</h2>
                        <p >{selectedPost.content}</p>
                    </div>
                    <div className="result">
                        <div className="result_list">
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
                        <div className="comment">
                            <h2>コメント</h2>
                            <p>{selectedStock && selectedStock.comment}</p>
                        </div>
                    </div>
                    {prediction && (
                        <div className="market_prediction">
                            <section>
                                <h2 className="title">相場予想</h2>
                                <div className="content">{prediction.prediction}</div>
                            </section>
                            <section>
                                <h2 className="title">戦略</h2>
                                <div className="content">{prediction.strategy}</div>
                            </section>
                            <section>
                                <h2 className="title">注目セクター</h2>
                                <div className="content">{prediction.featured_sector}</div>
                            </section>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
