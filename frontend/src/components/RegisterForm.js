import '../styles/components/RegisterForm.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AppActions, AppContext } from '../stores/App'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function RegisterForm(props) {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const { setOpen } = props
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()
    const onSubmit = async (data) => {
        axios.post(`/user/register`, data)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    localStorage.setItem("access_token", response.data)
                    dispatch({ type: AppActions.SET_USER, payload: { ...user, status: true } });
                    history.push("/")
                }
            })
    }

    return (
        <div >
            <form className="register_form" onSubmit={handleSubmit(onSubmit)}>
                <span className="login_bttn" onClick={()=>{setOpen(null)}}>ログインはこちら</span>
                <div className="each_input" >
                    <fieldset>
                        <legend>ユーザー名</legend>
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
                        <legend>パスワード</legend>
                        <label>
                            <input type="text" autoComplete="off" defaultValue=""
                                {...register('password', { required: `パスワードが入力されていません` })}
                            ></input>
                        </label>
                    </fieldset>
                    {(errors['password']) ? (<span className="error">{errors['password'].message}</span>) : null}
                </div>
                <div className="button"><input type="submit" value="REGISTER" /></div>
            </form>
        </div>
    )
}
