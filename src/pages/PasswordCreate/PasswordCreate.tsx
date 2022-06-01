import { FC, KeyboardEvent, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import s from './PasswordCreate.module.css';

import { authAPI } from 'api';
import { SuperButton, SuperInputPassword } from 'components';
import { MAX_PASSWORD_LENGTH } from 'constant';
import { validatePassword } from 'helpers';
import { useSuperInput } from 'hooks';
import { AppRoutePaths } from 'routes';

export const PasswordCreate: FC = () => {
  const [password, onPasswordChange, error, setError] = useSuperInput(validatePassword);
  const [isSending, setIsSending] = useState<boolean>(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const isPasswordControlsDisabled =
    !!error || isSending || password.length <= MAX_PASSWORD_LENGTH;

  const onCreateButtonClick = (): void => {
    setIsSending(true);
    authAPI
      .setNewPassword({ password, resetPasswordToken: token! })
      .then(() => {
        navigate(AppRoutePaths.LOGIN);
      })
      .catch(e => {
        setError(e.response.data.error);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !isPasswordControlsDisabled) {
      onCreateButtonClick();
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
        onChangeText={onPasswordChange}
        error={error}
        disabled={isSending}
        onKeyDown={onEnterKeyDown}
      />
      <p>Create new password and we will send you further instructions to email</p>
      <SuperButton onClick={onCreateButtonClick} disabled={isPasswordControlsDisabled}>
        Create new password
      </SuperButton>
    </div>
  );
};
