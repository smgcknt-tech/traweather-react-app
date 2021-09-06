import '../styles/components/MarketPredictionForm.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { context, actions } from '../stores/TopPage';
import { helper } from '../utils/helper';

export default function MarketPredictionForm(props) {
    const { dispatch} = useContext(context);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const obj = { "予想": "", "戦略": "", "注目セクター": "" }
    const onSubmit = (data) => {
        helper.postData('/api/create_prediction/', dispatch, actions, data)
            .then((data) => {
                props.setOpen(null)
            })
    }

    return (
        <div className="market_prediction_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div><span onClick={() => { props.setOpen(null) }}><i className="fas fa-times"></i></span></div>
                {(Object.keys(obj).map((key, index) => {
                    return (
                        <div className="each_input" key={index}>
                            <fieldset>
                                <legend>{key}</legend>
                                <label>
                                    <textarea type="text" autoComplete="off" defaultValue=""
                                        {...register(key, { required: `${key}が入力されていません` })}
                                    ></textarea>
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
}
