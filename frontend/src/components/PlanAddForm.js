import '../styles/components/PlanAddForm.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { context, actions } from '../stores/PlanPage';
import { helper } from '../utils/helper';

export default function PlanAddForm(props) {
    const { dispatch } = useContext(context);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const obj = { code: "", market: "", stockname: "", opening: "", support: "", losscut: "", goal: "", reason: "", strategy: "" }
    const onSubmit = (data) => {
        helper.postData('/api/plan', dispatch, actions, data)
            .then((data) => {
                dispatch({ type: actions.SET_PLAN, payload: data })
                props.setOpen(null)
            })
    }
    return (
        <div className="plan_add_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>追加フォーム</div>
                {(Object.keys(obj).map((key, index) => {
                    return (
                        <>
                            <fieldset key={index}>
                                <legend>{key}</legend>
                                <label>
                                    <input type="text" autoComplete="off" defaultValue=""
                                        {...register(key, { required: `${key}が入力されていません` })} />
                                </label>
                            </fieldset>
                            {(errors[key]) ? (<span className="error">{errors[key].message}</span>) : null}
                        </>
                    )
                }))}
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    )
}
