import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import s from './Nav.module.css';

import { SuperButton } from 'components/shared';
import { logoutUser } from 'pages/Login/loginReducer';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

export const Nav: FC = () => {
  const isAuth = useAppSelector(state => state.login.isAuth);
  const dispatch = useAppDispatch();
  const onButtonClick = (): void => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <h2>Navigation</h2>
      <nav className={s.nav}>
        <NavLink to={AppRoutePaths.LOGIN}>Login</NavLink>
        <NavLink to={AppRoutePaths.NOT_FOUND}>404</NavLink>
        <NavLink to={AppRoutePaths.PASSWORD_CREATE}>Password create</NavLink>
        <NavLink to={AppRoutePaths.PASSWORD_RECOVERY}>Password recovery</NavLink>
        <NavLink to={AppRoutePaths.PROFILE}>Profile</NavLink>
        <NavLink to={AppRoutePaths.REGISTRATION}>Registration</NavLink>
        <NavLink to={AppRoutePaths.TEST_BENCH}>Test bench</NavLink>
        {isAuth && (
          <SuperButton
            type="button"
            onClick={onButtonClick}
            size="small"
            shape="round"
            color="secondary"
          >
            Log Out
          </SuperButton>
        )}
      </nav>
    </div>
  );
};
