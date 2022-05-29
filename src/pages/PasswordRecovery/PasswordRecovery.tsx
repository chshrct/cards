import React, { KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../../api/api";
import SuperButton from "../../components/shared/SuperButton/SuperButton";
import SuperInputText from "../../components/shared/SuperInputText/SuperInputText";
import { RoutePaths } from "../../constants/routePaths";
import s from "./PasswordRecovery.module.css";
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { validateEmail } from "../../helpers/validation/inputValidators";



const PasswordRecovery = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const sendDisabled = !!error || sending || email.length < 6;
  const emailOnChangeHandler = (value: string) => {
    setEmail(value);
    setError(validateEmail(value));
  };

  const sendHandler = () => {
    setSending(true);
    authAPI.passRecover(email).then((res) => {
      setEmailSent(true);
    }).catch((e) => {
      setError(e.response.data.error)
    }).finally(() => {
      setSending(false);
    })
  };
  const onEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendHandler();
    }

  }
  return (
    <div className={s.pRecWrapper}>
      <h2>it-incubator</h2>
      {!emailSent ? <>
        <h3>Forgot your password?</h3>
        <SuperInputText
          placeholder="Email"
          value={email}
          onChangeText={emailOnChangeHandler}
          error={error}
          onKeyDown={onEnter}
          disabled={sending}
        />
        <p>Enter your email address and we will send you further instructions</p>
        <SuperButton disabled={sendDisabled} onClick={sendHandler}>
          Send Instructions
        </SuperButton>
        <p>Did you remember your password?</p>
        <Link to={RoutePaths.login} className={s.link}>
          Try logging in
        </Link>
      </> : <>
        <EmailIcon />
        <h3>Check Email</h3>
        <p>We’ve sent an Email with instructions to {email}</p>
      </>}

    </div>
  );
};

export default PasswordRecovery;
