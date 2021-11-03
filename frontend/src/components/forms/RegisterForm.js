import '../../styles/components/RegisterForm.scss';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function RegisterForm(props) {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const { setOpen } = props;
    const { register, handleSubmit, formState: { errors } } = useForm();
    let history = useHistory()
    const onSubmit = async (data) => {
        axios.post(`/api/user/register`, data)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    localStorage.setItem("access_token", response.data);
                    dispatch({ type: AppActions.SET_USER, payload: { ...user, status: true } });
                    history.push("/market");
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
            <form className="register_form" onSubmit={handleSubmit(onSubmit)}>
                <span className="login_bttn" onClick={() => { setOpen(null) }}>ログインはこちら</span>
                {displayForm}
                <div className="button"><input type="submit" value="REGISTER" /></div>
            </form>
        </div>
    );
};
