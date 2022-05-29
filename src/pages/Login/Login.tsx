import React from 'react';
import {LoginForm} from './LoginForm/LoginForm';
import s from './Login.module.css';

const Login = () => {
  return (
    <div className={s.loginWrapper}>
        <h2>It-incubator</h2>
        <h3>Sign In</h3>
        <LoginForm/>
    </div>
  );
};

export default Login;
