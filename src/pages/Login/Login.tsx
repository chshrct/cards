import React from 'react';
import {LoginForm} from './LoginForm/LoginForm';
import s from './Login.module.css';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {RoutePaths} from '../../constants/routePaths';
import { Navigate } from 'react-router-dom';

const Login = () => {

    const isAuth = useSelector<AppRootStateType>((state) => state.login.isAuth);
    if (isAuth) return <Navigate to={RoutePaths.profile}/>

  return (
    <div className={s.loginWrapper}>
        <h2>It-incubator</h2>
        <h3>Sign In</h3>
        <LoginForm/>
    </div>
  );
};

export default Login;
