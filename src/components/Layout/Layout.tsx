import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Nav } from './Nav';

export const Layout: FC = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
