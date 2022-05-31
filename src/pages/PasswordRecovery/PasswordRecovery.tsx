import React, { FC, KeyboardEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import s from './PasswordRecovery.module.css';

import { authAPI } from 'api';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { SuperButton, SuperInputText } from 'components';
import { EMPTY_STRING } from 'constant';
import { validateEmail } from 'helpers';
import { AppRoutePaths } from 'routes';

export const PasswordRecovery: FC = () => {
  const [email, setEmail] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<string>(EMPTY_STRING);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const isEmailControlsDisabled = !!error || isSending;

  const onEmailChange = (value: string): void => {
    setEmail(value);
    setError(validateEmail(value));
  };

  const onSendEmailClick = (): void => {
    setIsSending(true);
    authAPI
      .passRecover(email)
      .then(() => {
        setIsEmailSent(true);
      })
      .catch(e => {
        setError(e.response.data.error);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const onEmailKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !isEmailControlsDisabled) {
      onSendEmailClick();
    }
  };

  return (
    <div className={s.pRecWrapper}>
      <h2>it-incubator</h2>
      {!isEmailSent ? (
        <>
          <h3>Forgot your password?</h3>
          <SuperInputText
            placeholder="Email"
            value={email}
            onChangeText={onEmailChange}
            error={error}
            onKeyDown={onEmailKeyDown}
            disabled={isSending}
          />
          <p>Enter your email address and we will send you further instructions</p>
          <SuperButton disabled={isEmailControlsDisabled} onClick={onSendEmailClick}>
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
  );
};
