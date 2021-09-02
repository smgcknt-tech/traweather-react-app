import '../styles/components/PlanAddForm.scss'
import { useForm } from 'react-hook-form'
import { memo, useContext } from 'react';
import { context, actions } from '../stores/PlanPage';
import { helper } from '../utils/helper';

export default memo(function PlanAddForm(props) {
    const {dispatch } = useContext(context);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const obj = { code: "", opening: "", support: "", losscut: "", goal: "", reason: "", strategy: "" }
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
                <div><span onClick={() => { props.setOpen(null) }}><i className="fas fa-times"></i></span></div>
                {(Object.keys(obj).map((key, index) => {
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
                            {(errors[key]) ? (<span key={index} className="error">{errors[key].message}</span>) : null}
                        </div>
                    )
                }))}
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    )
})
