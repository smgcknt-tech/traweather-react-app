import '../../styles/components/PlanAddForm.scss';
import { useForm } from 'react-hook-form';
import { memo, useContext, useState } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { helper } from '../../utils/helper';

export default memo(function PlanAddForm(props) {
    const { state, dispatch } = useContext(AppContext);
    const { allStocks, planData } = state;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formList = { code: "", opening: "", support: "", losscut: "", goal: "", reason: "", strategy: "" };
    const [values, setValues] = useState(formList);
    const handleInput = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setValues({ ...values, [name]: helper.FullNumToHalfNum(value) });
    };

    const onSubmit = async (data, e) => {
        const foundStock = allStocks.find((stock) => stock.code === data.code);
        if (!foundStock) {
            e.preventDefault();
            alert("株価データがないため、プランを作成できません。");
        } else {
            data.market = foundStock.market;
            data.stock_name = foundStock.stock_name;
            data.user_id = state.user.id;
            const response = await helper.postData(`/api/plan/create`, dispatch, AppActions, data);
            if (response) {
                dispatch({ type: AppActions.SET_PLAN, payload: response });
                const foundStock = response.find((stock) => stock.code === Number(data.code));
                dispatch({ type: AppActions.SET_SELECTED_STOCK, payload: foundStock });
            };
        };
        props.setOpen(null);
    };

    const displayForm = Object
        .keys(formList)
        .map((key, index) => {
            return (
                <div className="each_input" key={index}>
                    <fieldset>
                        <legend>{key}</legend>
                        <label>
                            <input type="text" autoComplete="off" defaultValue={values[key]} value={values[key]}
                                {...register(key, { required: `${key}が入力されていません` })}
                                onChange={(e) => handleInput(e)}
                            />
                        </label>
                    </fieldset>
                    {(errors[key]) ? (
                        <span key={index} className="error">{errors[key].message}</span>
                    ) : null}
                </div>
            );
        });

    return (
        <div className="plan_add_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div><span onClick={() => { props.setOpen(null) }}><i className="fas fa-times"></i></span></div>
                {displayForm}
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    );
});