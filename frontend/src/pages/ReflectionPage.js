import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppContext, AppActions } from '../AppStore';
import { helper } from '../utils/helper';
import ReactPaginate from 'react-paginate';
import Loading from '../components/common/Loading';
import Message from '../components/common/Message';
import noImage from '../images//noImage.jpg';
import '../styles/pages/ReflectionPage.scss';
import TradeFeedBackForm from '../components/forms/TradeFeedBackForm';

export default function ReflectionPage() {
  const { state, dispatch } = useContext(AppContext);
  const { user, loading, error, resultData, selectedStock, posts, selectedPost, currentPage, prediction } = state;
  const refs = useRef([]);
  const rowsPerPage = 5;
  const pagesVisited = currentPage * rowsPerPage;
  const pageCount = Math.ceil(resultData.length / rowsPerPage);
  const [open, setOpen] = useState(false);
  const title = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (user.id) {
      (async () => {
        const data = await helper.fetchData(`/api/feedback_list`, dispatch, AppActions, { user_id: user.id });
        if (data) dispatch({ type: AppActions.SET_POSTS, payload: data });
      })();
    }
  }, [user, dispatch]);

  const handleClick = async (e, i, date) => {
    const { prediction, dailyResult } = await helper.fetchData(`/api/feedback`, dispatch, AppActions, {
      user_id: user.id,
      date: date,
    });
    if (prediction) {
      dispatch({ type: AppActions.SET_PREDICTION, payload: prediction });
    }
    if (dailyResult) {
      dispatch({ type: AppActions.SET_RESULT, payload: dailyResult });
      dispatch({ type: AppActions.SET_SELECTED_POST, payload: posts[i] });
    }
  };

  const displayRows = resultData.slice(pagesVisited, pagesVisited + rowsPerPage).map((stock, index) => {
    return (
      <tr
        id={`tr_${index}`}
        key={index}
        onClick={() => handleSelect(index)}
        ref={(el) => {
          refs.current[index] = el;
        }}
      >
        <td data-label="????????????">{stock.code}</td>
        <td data-label="??????">{stock.market}</td>
        <td data-label="?????????">{stock.stock_name}</td>
        <td data-label="LOT">{stock.lot}</td>
        <td data-label="ENTRY">{stock.entry_point}</td>
        <td data-label="EXIT">{stock.exit_point}</td>
        <td data-label="?????????">{stock.profit_loss}</td>
        <td data-label="?????????">{stock.profit_loss_rate}</td>
        <td data-label="???????????????">{stock.total_profit_loss}</td>
      </tr>
    );
  });

  const changePage = ({ selected }) => {
    dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: selected });
  };

  const handleSelect = (index) => {
    dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: resultData[pagesVisited + index] });
  };

  const profitResult = useMemo(() => {
    return resultData.map((result) => result.total_profit_loss).reduce((a, x) => (a += x), 0);
  }, [resultData]);

  const profit_loss_rate = useMemo(() => {
    const sum = resultData.map((result) => result.profit_loss_rate).reduce((a, x) => (a += x), 0);
    return (sum / resultData.length).toFixed(2);
  }, [resultData]);

  const handleDelete = async (feed_back_id, user_id) => {
    const data = await helper.postData(`api/reflection/delete`, dispatch, AppActions, { feed_back_id, user_id });
    if (data) dispatch({ type: AppActions.SET_POSTS, payload: data });
  };

  const archives = posts.map((post, index) => {
    const { title, image_url, created_at, feed_back_id, user_id } = post;
    const date = created_at.split('T')[0];
    return (
      <div className="post" key={index}>
        <i onClick={() => handleDelete(feed_back_id, user_id)} className="fas fa-trash"></i>
        <div
          className="post_body"
          key={index}
          onClick={(e) => {
            handleClick(e, index, date);
          }}
        >
          <div
            className="post_header"
            key={index}
            onClick={(e) => {
              handleClick(e, index, date);
            }}
          >
            <div>{date}</div>
            <h2>{title}</h2>
          </div>
          <div className="image_container">
            <img src={image_url ? `${image_url}` : noImage} alt="thumbnail" />
          </div>
        </div>
      </div>
    );
  });

  const handleClose = () => {
    dispatch({ type: AppActions.SET_SELECTED_POST, payload: null });
  };

  const openFeedbackForm = () => {
    setOpen('feed_back');
  };

  const handleSubmit = async () => {
    const payload = {
      title: title.current.value,
      content: content.current.value,
      feed_back_id: selectedPost.feed_back_id,
    };
    const data1 = await helper.postData(`/api/reflection/update_feed_back`, dispatch, AppActions, payload);
    if (data1) dispatch({ type: AppActions.SET_SELECTED_POST, payload: data1 });
    const data2 = await helper.fetchData(`/api/feedback_list`, dispatch, AppActions, { user_id: user.id });
    if (data2) dispatch({ type: AppActions.SET_POSTS, payload: data2 });
  };

  if (loading) return <Loading />;
  if (error) return <Message variant="error">{error}</Message>;
  return (
    <div className="reflection_page">
      {!selectedPost && (
        <div className="reflection_container">
          <ul className="header_menu">
            <li onClick={openFeedbackForm}>
              <i className="fas fa-edit" />
              POST
            </li>
          </ul>
          {open === 'feed_back' && <TradeFeedBackForm setOpen={setOpen} />}
          <div className="archive">{archives}</div>
        </div>
      )}
      {selectedPost && (
        <div className="description_container">
          <div className="close_btn" onClick={handleClose}>
            <i className="fas fa-undo-alt" />
            <span>?????????????????????</span>
          </div>
          <div className="indicators">
            <div className="total_profit">
              <div className="card_value">{profitResult}???</div>
              <div className="card_title">????????????</div>
            </div>
            <div className="profit_loss_rate">
              <div className="card_value">{profit_loss_rate}%</div>
              <div className="card_title">???????????????</div>
            </div>
          </div>
          <div className="feed_back">
            <fieldset>
              <legend>????????????</legend>
              <label>
                <input id="title" key={selectedPost.title} type="text" defaultValue={selectedPost.title} ref={title} />
              </label>
            </fieldset>
            <fieldset>
              <legend>????????????</legend>
              <label>
                <textarea
                  id="content"
                  key={selectedPost.content}
                  type="text"
                  defaultValue={selectedPost.content}
                  ref={content}
                />
              </label>
            </fieldset>
            <div className="button">
              <span onClick={handleSubmit}>??????</span>
            </div>
          </div>
          <div className="result">
            <div className="result_list">
              <table>
                <thead>
                  <tr>
                    <th>???????????????</th>
                    <th>??????</th>
                    <th>?????????</th>
                    <th>?????????</th>
                    <th>ENTRY</th>
                    <th>EXIT</th>
                    <th>?????????</th>
                    <th>?????????(%)</th>
                    <th>?????????</th>
                  </tr>
                </thead>
                <tbody>{resultData.length > 0 && displayRows}</tbody>
              </table>
              {resultData.length > 0 && (
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={pageCount}
                  initialPage={currentPage}
                  onPageChange={changePage}
                  containerClassName={'pagination_bttns'}
                  previousLinkClassName={'previous_bttn'}
                  nextLinkClassName={'next_bttn'}
                  disabledClassName={'pagination_disabled'}
                  activeClassName={'pagination_active'}
                />
              )}
            </div>
            {selectedStock && (
              <div className="comment">
                <h2>????????????</h2>
                <p>{selectedStock.comment}</p>
              </div>
            )}
          </div>
          {prediction && (
            <div className="market_prediction">
              <section>
                <h2 className="title">????????????</h2>
                <div className="content">{prediction.prediction}</div>
              </section>
              <section>
                <h2 className="title">??????</h2>
                <div className="content">{prediction.strategy}</div>
              </section>
              <section>
                <h2 className="title">??????????????????</h2>
                <div className="content">{prediction.featured_sector}</div>
              </section>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
