import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import s from './Nav.module.css';

import { AppRoutePaths } from 'routes';

export const Nav: FC = () => {
  return (
    <div>
      <h2>Navigation</h2>
      <nav className={s.nav}>
        <NavLink to={AppRoutePaths.INDEX}>Home</NavLink>
        <NavLink to={AppRoutePaths.LOGIN}>Login</NavLink>
        <NavLink to={AppRoutePaths.NOT_FOUND}>404</NavLink>
        <NavLink to={AppRoutePaths.PASSWORD_CREATE}>Password create</NavLink>
        <NavLink to={AppRoutePaths.PASSWORD_RECOVERY}>Password recovery</NavLink>
        <NavLink to={AppRoutePaths.PROFILE}>Profile</NavLink>
        <NavLink to={AppRoutePaths.REGISTRATION}>Registration</NavLink>
        <NavLink to={AppRoutePaths.TEST_BENCH}>Test bench</NavLink>
      </nav>
    </div>
  );
};
