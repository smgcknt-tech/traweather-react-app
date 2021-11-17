import '../../styles/components/PlanAddForm.scss';
import { useForm } from 'react-hook-form';
import { memo, useContext, useState } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { helper } from '../../utils/helper';

export default memo(function PlanAddForm(props) {
  const { state, dispatch } = useContext(AppContext);
  const { allStocks } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formList = { code: '', opening: '', support: '', losscut: '', goal: '', reason: '', strategy: '' };
  const [values, setValues] = useState(formList);
  const handleInput = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (data, e) => {
    const foundStock = allStocks.find((stock) => stock.code === String(data.code));
    if (!foundStock) {
      e.preventDefault();
      alert('株価データがないため、プランを作成できません。');
    } else {
      data.market = foundStock.market;
      data.stock_name = foundStock.stock_name;
      data.user_id = state.user.id;
      const response = await helper.postData(`/api/plan/create`, dispatch, AppActions, data);
      if (response) {
        dispatch({ type: AppActions.SET_PLAN, payload: response });
        const foundStock = response.find((stock) => stock.code === Number(data.code));
        dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: foundStock });
      }
    }
    props.setOpen(null);
  };

  const handleOpen=()=>{
    props.setOpen(null);
  }

  return (
    <div className="plan_add_form">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span onClick={handleOpen}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="each_input">
          <fieldset>
            <legend>証券番号(code)</legend>
            <label>
              <input
                type="number"
                autoComplete="off"
                placeholder="証券番号を検索欄から調べて入力"
                value={values['code']}
                {...register('code', { required: `証券番号が入力されていません` })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['code'] ? <span className="error">{errors['code'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>始値(expected opening price)</legend>
            <label>
              <input
                type="number"
                autoComplete="off"
                placeholder="株価の予想始値または予想購入価格を入力"
                value={values['opening']}
                {...register('opening', { required: `予想始値が入力されていません` })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['opening'] ? <span className="error">{errors['opening'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>支持値(support price to bounce)</legend>
            <label>
              <input
                type="number"
                autoComplete="off"
                placeholder="株価の予想反発値を入力"
                defaultValue={values['support']}
                {...register('support', { required: '予想反発値が入力されていません' })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['support'] ? <span className="error">{errors['support'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>仕切値(losscut price)</legend>
            <label>
              <input
                type="number"
                autoComplete="off"
                placeholder="株価の予想損失確定値を入力"
                defaultValue={values['losscut']}
                {...register('losscut', { required: `予想損失確定値が入力されていません` })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['losscut'] ? <span className="error">{errors['losscut'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>目標値(goal price to sell)</legend>
            <label>
              <input
                type="number"
                autoComplete="off"
                placeholder="株価の予想売却値を入力"
                defaultValue={values['goal']}
                {...register('goal', { required: `予想売却値が入力されていません` })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['goal'] ? <span className="error">{errors['goal'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>選定理由(Reason to trade)</legend>
            <label>
              <input
                type="text"
                autoComplete="off"
                placeholder="株価の選定理由を入力"
                defaultValue={values['reason']}
                {...register('reason', { required: `選定理由が入力されていません` })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['reason'] ? <span className="error">{errors['reason'].message}</span> : null}
        </div>
        <div className="each_input">
          <fieldset>
            <legend>戦略(trade strategy)</legend>
            <label>
              <input
                type="text"
                autoComplete="off"
                placeholder="株価のトレード戦略を入力"
                defaultValue={values['strategy']}
                {...register('strategy', { required: `トレード戦略が入力されていません` })}
                onChange={(e) => handleInput(e)}
              />
            </label>
          </fieldset>
          {errors['strategy'] ? <span className="error">{errors['strategy'].message}</span> : null}
        </div>

        <div className="button">
          <input type="submit" value="保存" />
        </div>
      </form>
    </div>
  );
});
