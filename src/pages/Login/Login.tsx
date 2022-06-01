import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import s from './Login.module.css';
import { LoginForm } from './LoginForm/LoginForm';

import { AppRoutePaths } from 'routes';
import { useAppSelector } from 'store';

export const Login: FC = () => {
  const isAuth = useAppSelector(state => state.login.isAuth);
  if (isAuth) return <Navigate to={AppRoutePaths.PROFILE} />;

  return (
    <div className={s.loginWrapper}>
      <h2>It-incubator</h2>
      <h3>Sign In</h3>
      <LoginForm />
    </div>
  );
};
