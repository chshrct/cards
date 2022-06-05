import { FC, KeyboardEvent } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import s from './PasswordCreate.module.css';

import { sendPassword } from 'App/auth/authReducer';
import { SuperButton, SuperInputText } from 'components';
import { MAX_PASSWORD_LENGTH } from 'constant';
import { validatePassword } from 'helpers';
import { useSuperInput } from 'hooks';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

export const PasswordCreate: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, onPasswordChange, error, isTouched, onBlur] =
    useSuperInput(validatePassword);
  const isLoading = useAppSelector(state => state.app.isLoading);

  const isPasswordControlsDisabled =
    !!error || isLoading || password.length <= MAX_PASSWORD_LENGTH || !isTouched;

  const onCreateButtonClick = (): void => {
    dispatch(sendPassword(password, token!)).then((redirectToLogin: boolean | void) => {
      if (redirectToLogin) navigate(AppRoutePaths.LOGIN);
    });
  };

  const onEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !isPasswordControlsDisabled) {
      onCreateButtonClick();
    }
  };

  return (
    <div className={s.pCrContainer}>
      <div className={s.pCrWrapper}>
        <h2>it-incubator</h2>
        <h3>Create new password</h3>
        <SuperInputText
          id="password"
          label="Password"
          type="password"
          value={password}
          onChangeText={onPasswordChange}
          error={error}
          disabled={isLoading}
          onKeyDown={onEnterKeyDown}
          onBlur={onBlur}
        />
        <p>Create new password and we will send you further instructions to email</p>
        <SuperButton
          onClick={onCreateButtonClick}
          disabled={isPasswordControlsDisabled}
          size="large"
          color="primary"
          shape="round"
        >
          Create new password
        </SuperButton>
      </div>
    </div>
  );
};
