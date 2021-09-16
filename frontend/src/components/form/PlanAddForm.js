import '../../styles/components/PlanAddForm.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { context, actions } from '../../stores/PlanPage';
import { AppActions, AppContext } from '../../stores/App'
import { helper } from '../../utils/helper';

export default function PlanAddForm(props) {
    const { state, dispatch } = useContext(context);
    const { planData } = state
    const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
    const { allStocks } = AppState;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const obj = { code: "", opening: "", support: "", losscut: "", goal: "", reason: "", strategy: "" }
    console.log(planData)

    const onSubmit = async (data, e) => {
        if (planData.find((stock) => stock.code === Number(data.code))) {
            e.preventDefault()
            alert("その銘柄はすでに追加されています")
        } else {
            const foundStock = allStocks.find((stock) => stock.code === data.code)
            data.market = foundStock.market
            data.stock_name = foundStock.stock_name
            data.user_id = AppState.user.id
            const response = await helper.postData(`/api/create_plan`, AppDispatch, AppActions, data)
            if (response) {
                dispatch({ type: actions.SET_PLAN, payload: response })
                const foundStock = response.find((stock) => stock.code === Number(data.code))
                dispatch({ type: actions.SET_SELECTED_STOCK, payload: foundStock })
            }
        }
        props.setOpen(null)
    }

    return (
        <div className="plan_add_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div><span onClick={() => { props.setOpen(null) }}><i className="fas fa-times"></i></span></div>
                {(Object
                    .keys(obj)
                    .map((key, index) => {
                        return (
                            <div className="each_input" key={index}>
                                <fieldset>
                                    <legend>{key}</legend>
                                    <label>
                                        <input type="text" autoComplete="off" defaultValue=""
                                            {...register(key, { required: `${key}が入力されていません` })}
                                        />
                                    </label>
                                </fieldset>
                                {(errors[key]) ? (
                                    <span key={index} className="error">{errors[key].message}</span>
                                ) : null}
                            </div>
                        )
                    }))}
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    )
}
