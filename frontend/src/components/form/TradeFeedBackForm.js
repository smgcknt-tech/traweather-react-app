import '../../styles/components/TradeFeedBackForm.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { context, actions } from '../../stores/TopPage';
import { AppContext } from '../../stores/App';
import { helper } from '../../utils/helper';
import { useHistory } from 'react-router';

export default function TradeFeedBackForm(props) {
    const { dispatch } = useContext(context);
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()

    const onSubmit = async(data) => {
        data.user_id = user.id
        data.date = helper.get_today()
        const response = await helper.postData('/api/create_prediction', dispatch, actions, data)
        if(response){
            history.push('/plan')
        }
        props.setOpen(null)
    }

    return (
        <div className="trade_feed_back_form">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div><span onClick={() => { props.setOpen(null) }}><i className="fas fa-times"></i></span></div>
                <div className="each_input" >
                    <fieldset>
                        <legend>タイトル</legend>
                        <label>
                            <input type="text" autoComplete="off" defaultValue=""
                                {...register('username', { required: `ユーザー名が入力されていません` })}
                            ></input>
                        </label>
                    </fieldset>
                    {(errors['username']) ? (<span className="error">{errors['username'].message}</span>) : null}
                </div>
                <div className="each_input" >
                    <fieldset>
                        <legend>反省文</legend>
                        <label>
                            <textarea type="text" autoComplete="off" defaultValue=""
                                {...register('content', { required: `反省文が入力されていません` })}
                            ></textarea>
                        </label>
                    </fieldset>
                    {(errors['password']) ? (<span className="error">{errors['password'].message}</span>) : null}
                </div>
                <div className="each_input" >
                    <fieldset>
                        <legend>画像</legend>
                        <label>
                            <input type="text" autoComplete="off" defaultValue=""
                                {...register('password', { required: `パスワードが入力されていません` })}
                            ></input>
                        </label>
                    </fieldset>
                    {(errors['password']) ? (<span className="error">{errors['password'].message}</span>) : null}
                </div>
                <div className="button"><input type="submit" value="保存" /></div>
            </form>
        </div>
    )
}
