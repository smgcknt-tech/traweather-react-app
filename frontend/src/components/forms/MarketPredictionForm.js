import '../../styles/components/MarketPredictionForm.scss';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { helper } from '../../utils/helper';

export default function MarketPredictionForm(props) {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.user_id = user.id;
        const res = await helper.postData('/api/prediction/create', dispatch, AppActions, data);
        if (res.createdData) dispatch({ type: AppActions.SET_PREDICTION, payload: res.createdData });
        if (res.message) alert(res.message);
        props.setOpen(null);
    };

    const formList = { "予想": "", "戦略": "", "注目セクター": "" };
    const displayForm = Object
        .keys(formList)
        .map((key, index) => {
            return (
                <div className="each_input" key={index}>
                    <fieldset>
                        <legend>{key}</legend>
                        <label>
                            <textarea type="text" autoComplete="off" defaultValue="" data-testid={key}
                                {...register(key, { required: `${key}が入力されていません` })}
                            ></textarea>
                        </label>
                    </fieldset>
                    {(errors[key]) ? (
                        <span key={index} className="error">{errors[key].message}</span>
                    ) : null}
                </div>
            )
        })

    return (
        <div className="market_prediction_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span onClick={() => { props.setOpen(null) }}> <i className="fas fa-times"></i></span>
                </div>
                {displayForm}
                <div className="button"><input data-testid="submit_btn" type="submit" value="保存" /></div>
            </form>
        </div>
    );
};
