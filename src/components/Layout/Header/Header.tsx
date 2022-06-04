import React, { FC } from 'react';

import s from './Header.module.css';
import { Nav } from './Nav';

import { SuperButton } from 'components/shared';
import { logoutUser } from 'pages/Login/loginReducer';
import { useAppDispatch, useAppSelector } from 'store';

export const Header: FC = () => {
  const isAuth = useAppSelector(state => state.login.isAuth);
  const dispatch = useAppDispatch();
  const onButtonClick = (): void => {
    dispatch(logoutUser());
  };
  return (
    <div className={s.headerWrapper}>
      <Nav />
      {isAuth && (
        <div className={s.buttonWrapper}>
          <SuperButton
            type="button"
            onClick={onButtonClick}
            size="small"
            shape="round"
            color="secondary"
          >
            Log Out
          </SuperButton>
        </div>
      )}
    </div>
  );
};
