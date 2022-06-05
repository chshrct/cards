import React, { FC, KeyboardEvent } from 'react';

import { Link } from 'react-router-dom';

import s from './PasswordRecovery.module.css';

import { sendEmail } from 'App/auth/authReducer';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { SuperButton, SuperInputText } from 'components';
import { validateEmail } from 'helpers';
import { useSuperInput } from 'hooks';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

export const PasswordRecovery: FC = () => {
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isEmailSent = useAppSelector(state => state.auth.isEmailSent);
  const [email, onEmailChange, error, isTouched, onBlur] = useSuperInput(validateEmail);

  const isEmailControlsDisabled = !!error || isLoading || !isTouched;
  const dispatch = useAppDispatch();

  const onSendEmailClick = (): void => {
    dispatch(sendEmail(email));
  };

  const onEmailKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !isEmailControlsDisabled) {
      onSendEmailClick();
    }
  };

  return (
    <div className={s.pRecContainer}>
      <div className={s.pRecWrapper}>
        <h2>it-incubator</h2>
        {!isEmailSent ? (
          <>
            <h3>Forgot your password?</h3>
            <SuperInputText
              type="text"
              value={email}
              onChangeText={onEmailChange}
              error={error}
              label="Email"
              onKeyDown={onEmailKeyDown}
              disabled={isLoading}
              onBlur={onBlur}
            />
            <p>Enter your email address and we will send you further instructions</p>
            <SuperButton
              size="large"
              shape="round"
              color="primary"
              disabled={isEmailControlsDisabled}
              onClick={onSendEmailClick}
            >
              Send Instructions
            </SuperButton>
            <p>Did you remember your password?</p>
            <Link to={AppRoutePaths.LOGIN} className={s.link}>
              Try logging in
            </Link>
          </>
        ) : (
          <>
            <EmailIcon />
            <h3>Check Email</h3>
            <p>We’ve sent an Email with instructions to {email}</p>
          </>
        )}
      </div>
    </div>
  );
};
