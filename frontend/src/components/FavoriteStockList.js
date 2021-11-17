import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AppActions, AppContext } from '../AppStore';
import '../styles/components/FavoriteStockList.scss';
import { helper } from '../utils/helper';
import Loading from './common/Loading';
import Message from './common/Message';

export default function FavoriteStockList() {
  const { state, dispatch } = useContext(AppContext);
  const { user, loading } = state;
  const [list, setList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (user.id) {
      (async () => {
        await helper
          .fetchData(`/api/list/favorite`, dispatch, AppActions, {
            user_id: user.id,
          })
          .then((res) => setList(res));
      })();
    }
  }, [user.id, dispatch, setList]);

  const displayRows = list?.map((d, i) => {
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{d.code}</td>
        <td>{d.stock_name}</td>
        <td>{d.market}</td>
        <td>{d.industry}</td>
        <td>{d.try}回</td>
        <td>
          {d.win}W-{d.lose}L
        </td>
        <td>{d.pl}円</td>
        <td>{d.avg_pl}円</td>
        <td>{d.avg_plr}%</td>
        <td>{d.max}円</td>
        <td>{d.min}円</td>
      </tr>
    );
  });

  const handleClose = () => {
    history.push('/screening');
  };

  if (loading) return <Loading />;
  if (!list.length) return <Message>トレード記録がございません</Message>;
  return (
    <div className="favorite_stock_list">
      <div className="close_btn" onClick={handleClose}>
        <i className="fas fa-undo-alt" />
        <span>検索画面に戻る</span>
      </div>
      <div className="list_conatiner">
        <h2>お得意様銘柄</h2>
        <p>過去のトレード記録を元に利益の多い順に銘柄をpickupしました。</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>コード</th>
              <th>銘柄名</th>
              <th>業種</th>
              <th>市場</th>
              <th>取引数</th>
              <th>勝敗</th>
              <th>損益</th>
              <th>平均損益</th>
              <th>平均損益率</th>
              <th>最大利益</th>
              <th>最大損失</th>
            </tr>
          </thead>
          <tbody>{displayRows}</tbody>
        </table>
      </div>
    </div>
  );
}
