import React, { useState } from "react";
import SuperButton from "../../components/shared/SuperButton/SuperButton";
import s from './PasswordCreate.module.css';
import { validatePassword } from "../../helpers/validation/inputValidators";
import { useNavigate, useParams } from "react-router-dom";
import { authAPI } from "../../api/api";
import { RoutePaths } from "../../constants/routePaths";
import SuperInputPassword from "../../components/shared/SuperInputPassword/SuperInputPassword";



const PasswordCreate = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const createPasswordDisabled = !!error || sending || password.length < 8;
  const passwordOnChangeHandler = (value: string) => {
    setPassword(value);
    setError(validatePassword(value));
  };
  const createPasswordHandler = () => {
    setSending(true);
    authAPI.setNewPassword({ password, resetPasswordToken: token! }).then(
      (res) => {
        navigate(RoutePaths.login)
      }
    ).catch(
      (e) => {
        setError(e.response.data.error)
      }
    ).finally(() => {
      setSending(false);
    })
  }


  return (
    <div className={s.pCrWrapper}>
      <h2>it-incubator</h2>
      <h3>Create new password</h3>
      <SuperInputPassword type={'password'} placeholder='Password' value={password} onChangeText={passwordOnChangeHandler} error={error} disabled={sending} />
      <p>Create new password and we will send you further instructions to email</p>
      <SuperButton onClick={createPasswordHandler} disabled={createPasswordDisabled}>Create new password</SuperButton>
    </div>
  );
};

export default PasswordCreate;
