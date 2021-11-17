import '../../styles/components/RegisterForm.scss';
import { useForm } from 'react-hook-form';
import { memo, useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default memo(function RegisterForm(props) {
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


    return (
      <div>
        <form className="register_form" onSubmit={handleSubmit(onSubmit)}>
          <span
            className="login_bttn"
            onClick={() => {
              setOpen(null);
            }}
          >
            ログイン(LOGIN)
          </span>
          <div className="each_input">
            <fieldset>
              <legend>username</legend>
              <label>
                <input
                  type="text"
                  autoComplete="off"
                  defaultValue=""
                  {...register('username', { required: `usernameが入力されていません` })}
                ></input>
              </label>
            </fieldset>
            {errors['username'] ? <span className="error">{errors['username'].message}</span> : null}
          </div>
          <div className="each_input">
            <fieldset>
              <legend>password</legend>
              <label>
                <input
                  type="password"
                  autoComplete="off"
                  defaultValue=""
                  {...register('password', { required: `passwordが入力されていません` })}
                ></input>
              </label>
            </fieldset>
            {errors['password'] ? <span className="error">{errors['password'].message}</span> : null}
          </div>
          <div className="button">
            <input type="submit" value="REGISTER" />
          </div>
        </form>
      </div>
    );
});
