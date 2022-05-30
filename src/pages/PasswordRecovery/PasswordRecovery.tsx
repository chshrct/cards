import React, { FC, KeyboardEvent, useState } from 'react';

import { Link } from 'react-router-dom';

import s from './PasswordRecovery.module.css';

import { authAPI } from 'api/api';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import SuperButton from 'components/shared/SuperButton/SuperButton';
import SuperInputText from 'components/shared/SuperInputText/SuperInputText';
import { RoutePaths } from 'constants/routePaths';
import { validateEmail } from 'helpers/validation/inputValidators';

const PasswordRecovery: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const sendDisabled = !!error || isSending;
  const emailOnChangeHandler = (value: string): void => {
    setEmail(value);
    setError(validateEmail(value));
  };

  const sendHandler = (): void => {
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
  const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !sendDisabled) {
      sendHandler();
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
            onChangeText={emailOnChangeHandler}
            error={error}
            onKeyDown={onEnterHandler}
            disabled={isSending}
          />
          <p>Enter your email address and we will send you further instructions</p>
          <SuperButton disabled={sendDisabled} onClick={sendHandler}>
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

export default PasswordRecovery;
