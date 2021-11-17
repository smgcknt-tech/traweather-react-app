import { useForm } from 'react-hook-form';
import { memo, useContext } from 'react';
import { AppActions, AppContext } from '../../AppStore';
import axios from 'axios';
import '../../styles/components/LogInForm.scss';

export default memo(function LogInForm(props) {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const { setOpen } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    axios.post(`/api/user/login`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        dispatch({ type: AppActions.SET_USER, payload: { ...user, status: true } });
        localStorage.setItem('access_token', response.data);
      }
    });
  };

  const openRegister = () => {
    setOpen('register');
  };

  return (
    <div>
      <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register_bttn" onClick={openRegister}>
          <p>新規登録 (REGISTER)</p>
        </div>
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
          <input data-testid="login_btn" type="submit" value="LOG IN" />
        </div>
      </form>
    </div>
  );
});
