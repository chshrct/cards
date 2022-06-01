import { FC } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { AppRoutePaths } from '.';

import { Layout } from 'components';
import {
  Login,
  NotFound,
  PasswordCreate,
  PasswordRecovery,
  Profile,
  Registration,
  TestBench,
} from 'pages';

export const AppRouter: FC = () => {
  const appRoutes = useRoutes([
    {
      path: AppRoutePaths.INDEX,
      element: <Layout />,
      children: [
        { index: true, element: <h2>home page</h2> },
        {
          path: AppRoutePaths.RANDOM,
          element: <Navigate to={AppRoutePaths.NOT_FOUND} />,
        },
        { path: AppRoutePaths.NOT_FOUND, element: <NotFound /> },
        { path: AppRoutePaths.LOGIN, element: <Login /> },
        { path: AppRoutePaths.PASSWORD_CREATE, element: <PasswordCreate /> },
        { path: AppRoutePaths.PASSWORD_RECOVERY, element: <PasswordRecovery /> },
        { path: AppRoutePaths.PROFILE, element: <Profile /> },
        { path: AppRoutePaths.REGISTRATION, element: <Registration /> },
        { path: AppRoutePaths.TEST_BENCH, element: <TestBench /> },
      ],
    },
  ]);
  return appRoutes;
};
