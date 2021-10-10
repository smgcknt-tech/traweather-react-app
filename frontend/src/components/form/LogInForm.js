import '../../styles/components/LogInForm.scss'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { AppActions, AppContext } from '../../stores/App'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function LogInForm(props) {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const {setOpen} = props
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()
    const onSubmit = async (data) => {
        axios.post(`/user/login`, data)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    localStorage.setItem("access_token", response.data)
                    dispatch({ type: AppActions.SET_USER, payload: { ...user, status: true } });
                    history.push("/market")
                }
            })
    }

    return (
        <div >
            <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="register_bttn" onClick={()=> {setOpen("register")}}>新規登録はこちら</div>
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
                <div className="button"><input type="submit" value="LOG IN" /></div>
            </form>
        </div>
    )
}
