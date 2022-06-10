import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Header } from './Header/Header';
import s from './Layout.module.css';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className={s.outletWrapper}>
        <Outlet />
      </div>
    </>
  );
};
