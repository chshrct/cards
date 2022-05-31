import React, { FC, KeyboardEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import s from './PasswordRecovery.module.css';

import { authAPI } from 'api';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { SuperButton, SuperInputText } from 'components';
import { RoutePaths } from 'constant';
import { validateEmail } from 'helpers';

export const PasswordRecovery: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const isEmailControlDisabled = !!error || isSending;

  const handleEmailChange = (value: string): void => {
    setEmail(value);
    setError(validateEmail(value));
  };

  const onSendClick = (): void => {
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
    if (event.key === 'Enter' && !isEmailControlDisabled) {
      onSendClick();
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
            onChangeText={handleEmailChange}
            error={error}
            onKeyDown={onEmailKeyDown}
            disabled={isSending}
          />
          <p>Enter your email address and we will send you further instructions</p>
          <SuperButton disabled={isEmailControlDisabled} onClick={onSendClick}>
            Send Instructions
          </SuperButton>
          <p>Did you remember your password?</p>
          <Link to={RoutePaths.login} className={s.link}>
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
