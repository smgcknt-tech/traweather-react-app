import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../../styles/components/LogInForm.scss';

export default function LogInForm(props) {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const { setOpen } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory();
    const onSubmit = async (data) => {
        axios.post(`/api/user/login`, data)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    dispatch({ type: AppActions.SET_USER, payload: { ...user, status: true } });
                    localStorage.setItem("access_token", response.data);
                    history.push("/");
                };
            });
    };

    const formList = { "username": "", "password": "" };
    const displayForm = Object
        .keys(formList)
        .map((key, index) => {
            return (
                <div className="each_input" key={index}>
                    <fieldset>
                        <legend>{key}</legend>
                        <label>
                            <input type="text" autoComplete="off" defaultValue="" data-testid={key}
                                {...register(key, { required: `${key}が入力されていません` })}
                            ></input>
                        </label>
                    </fieldset>
                    {(errors[key]) ? (
                        <span key={index} className="error">{errors[key].message}</span>
                    ) : null}
                </div>
            )
        })
    return (
        <div >
            <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                <div className="register_bttn" onClick={() => { setOpen("register") }}>新規登録はこちら</div>
                {displayForm}
                <div className="button"><input data-testid="login_btn" type="submit" value="LOG IN" /></div>
            </form>
        </div>
    )
};
