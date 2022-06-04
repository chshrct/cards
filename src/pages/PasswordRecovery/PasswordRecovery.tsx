import React, { FC, KeyboardEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import s from './PasswordRecovery.module.css';

import { authAPI } from 'api';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { SuperButton, SuperInputText } from 'components';
import { validateEmail } from 'helpers';
import { useSuperInput } from 'hooks';
import { AppRoutePaths } from 'routes';

export const PasswordRecovery: FC = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [email, onEmailChange, error, setError, isTouched, onBlur] =
    useSuperInput(validateEmail);

  const isEmailControlsDisabled = !!error || isSending || !isTouched;

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
              disabled={isSending}
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
