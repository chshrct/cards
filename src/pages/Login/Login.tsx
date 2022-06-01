import React from 'react';
import {LoginForm} from './LoginForm/LoginForm';
import s from './Login.module.css';
import {RoutePaths} from '../../constants/routePaths';
import { Navigate } from 'react-router-dom';
import {useAppSelector} from 'store';

export const Login = () => {

    const isAuth = useAppSelector((state) => state.login.isAuth);
    if (isAuth) return <Navigate to={RoutePaths.profile}/>

  return (
    <div className={s.loginWrapper}>
        <h2>It-incubator</h2>
        <h3>Sign In</h3>
        <LoginForm/>
    </div>
  );
};
