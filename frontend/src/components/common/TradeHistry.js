import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { AppActions, AppContext } from '../../AppStore';
import '../../styles/components/TradeHistry.scss';
import { helper } from '../../utils/helper';

export default function TradeHistry() {
  const { state, dispatch } = useContext(AppContext);
  const { tradeHistry, currentPage } = state;
  const rowsPerPage = 5;
  const pagesVisited = currentPage * rowsPerPage;
  const pageCount = Math.ceil(tradeHistry.length / rowsPerPage);
  const changePage = ({ selected }) => {
    dispatch({ type: AppActions.SET_CURRENT_PAGE, payload: selected });
  };

  console.log(tradeHistry)

  const displayRows = tradeHistry.slice(pagesVisited, pagesVisited + rowsPerPage).map((stock, index) => {
    return (
      <tr key={index}>
        <td data-label="日付">{helper.format_dates(stock.created_at)}</td>
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
    );
  });

    return (
      <div className="trade_histry">
        <div className="table_container">
          <table>
            <thead>
              <tr>
                <th>日付</th>
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
            <tbody>{tradeHistry ? displayRows : 'トレード実績なし'}</tbody>
          </table>
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
        </div>
      </div>
    );
}
