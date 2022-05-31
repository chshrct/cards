import React, { FC, KeyboardEvent, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import s from './PasswordCreate.module.css';

import { authAPI } from 'api';
import { SuperButton, SuperInputPassword } from 'components';
import { MAX_PASSWORD_LENGTH, RoutePaths } from 'constant';
import { validatePassword } from 'helpers';

export const PasswordCreate: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const createPasswordDisabled =
    !!error || sending || password.length <= MAX_PASSWORD_LENGTH;
  const passwordOnChangeHandler = (value: string): void => {
    setPassword(value);
    setError(validatePassword(value));
  };
  const createPasswordHandler = (): void => {
    setSending(true);
    authAPI
      .setNewPassword({ password, resetPasswordToken: token! })
      .then(() => {
        navigate(RoutePaths.login);
      })
      .catch(e => {
        setError(e.response.data.error);
      })
      .finally(() => {
        setSending(false);
      });
  };
  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !createPasswordDisabled) {
      createPasswordHandler();
    }
  };

  return (
    <div className={s.pCrWrapper}>
      <h2>it-incubator</h2>
      <h3>Create new password</h3>
      <SuperInputPassword
        type="password"
        placeholder="Password"
        value={password}
        onChangeText={passwordOnChangeHandler}
        error={error}
        disabled={sending}
        onKeyDown={onEnterHandler}
      />
      <p>Create new password and we will send you further instructions to email</p>
      <SuperButton onClick={createPasswordHandler} disabled={createPasswordDisabled}>
        Create new password
      </SuperButton>
    </div>
  );
};
