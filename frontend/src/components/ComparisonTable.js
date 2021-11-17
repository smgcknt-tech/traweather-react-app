import '../styles/components/ComparisonTable.scss';
import React, { useContext } from 'react';
import { AppContext } from '../AppStore';

export default function ComparisonTable() {

    const { state } = useContext(AppContext);
    const { selectedStock: ssk } = state;
    return (
      <div className="comparison_table">
        <table>
          <thead>
            <tr>
              <th>項目</th>
              <th>予想</th>
              <th>結果</th>
              <th>差異</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>取得価格</th>
              <td>{ssk.opening}円</td>
              <td>{ssk.entry_point}円</td>
              <td>{ssk.opening - ssk.entry_point}円</td>
            </tr>
            <tr>
              <th>売却額</th>
              <td>{ssk.goal}円</td>
              <td>{ssk.exit_point}円</td>
              <td>{ ssk.exit_point - ssk.goal }円</td>
            </tr>
            <tr>
              <th>利確幅</th>
              <td>{ssk.goal - ssk.opening}円</td>
              <td>{ssk.profit_loss}円</td>
              <td>{ssk.profit_loss - (ssk.goal - ssk.opening)}円</td>
            </tr>
            <tr>
              <th>利確率</th>
              <td>{(((ssk.goal - ssk.opening) / ssk.opening) * 100).toFixed(1)}%</td>
              <td>{ssk.profit_loss_rate}%</td>
              <td>{(ssk.profit_loss_rate - ((ssk.goal - ssk.opening) / ssk.opening) * 100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};
