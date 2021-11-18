import '../../styles/components/MarketPredictionForm.scss';
import { useForm } from 'react-hook-form';
import { memo, useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { helper } from '../../utils/helper';

export default memo(function MarketPredictionForm(props) {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.user_id = user.id;
    const res = await helper.postData('/api/prediction/create', dispatch, AppActions, data);
    if (res.createdData) dispatch({ type: AppActions.SET_PREDICTION, payload: res.createdData });
    if (res.message) alert(res.message);
    props.setOpen(null);
  };

  return (
    <div className="market_prediction_form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span
            onClick={() => {
              props.setOpen(null);
            }}
          >
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="each_input">
          <fieldset>
            <legend>市場予想</legend>
            <label>
              <textarea
                type="text"
                autoComplete="off"
                placeholder="(記入例)　注目の小売指標が強かったこと、それに対して米国株もしっかり買いで反応したことから、日本株も連れ高の展開を予想する。CME225先物は小高い程度で節目の3万円は抵抗になるかもしれないが、米国の年末商戦への期待が高まる中では売りは出しづらい。ドル円が115円に接近していることは、外需企業の買い安心感を高める。押し目があれば買いは入りやすく、しっかりとした動きが続くと予想する。日経平均の予想レンジは29750円-30050円"
                defaultValue=""
                {...register('予想', { required: `市場予想が入力されていません` })}
              ></textarea>
            </label>
          </fieldset>
          {errors['予想'] ? <span className="error">{errors['予想'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>戦略</legend>
            <label>
              <textarea
                type="text"
                autoComplete="off"
                placeholder="(記入例）　様子見が無難か。今日は日本株としては半導体株の上昇を好感できなかったが、半導体株が大きく下落した際には、それに対するネガティブな反応が出てこないとは言い切れない。木曜と金曜は半導体株の値動きが荒くなりそうで、全体もその動向に神経質となるのでは。"
                defaultValue=""
                {...register('戦略', { required: `戦略が入力されていません` })}
              ></textarea>
            </label>
          </fieldset>
          {errors['戦略'] ? <span className="error">{errors['戦略'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>戦略</legend>
            <label>
              <textarea
                type="text"
                autoComplete="off"
                placeholder="(記入例）　半導体セクターの大型株に注目"
                {...register('注目セクター', { required: `注目セクターが入力されていません` })}
              ></textarea>
            </label>
          </fieldset>
          {errors['注目セクター'] ? <span className="error">{errors['注目セクター'].message}</span> : null}
        </div>
        <div className="button">
          <input data-testid="submit_btn" type="submit" value="保存" />
        </div>
      </form>
    </div>
  );
});
