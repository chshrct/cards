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
  EditProfile,
  Registration,
} from 'pages';
import { Learn } from 'pages/Learn/Learn';
import { CardsList } from 'pages/PacksList/CardsList/CardsList';
import { PacksList } from 'pages/PacksList/PacksList';
import { AuthCheck } from 'routes/AuthCheck';

export const AppRouter: FC = () => {
  const appRoutes = useRoutes([
    { index: true, element: <Navigate to={AppRoutePaths.LOGIN} /> },
    { path: AppRoutePaths.LOGIN, element: <Login /> },
    {
      path: AppRoutePaths.RANDOM,
      element: <Navigate to={AppRoutePaths.NOT_FOUND} />,
    },
    { path: AppRoutePaths.NOT_FOUND, element: <NotFound /> },
    { path: AppRoutePaths.PASSWORD_CREATE, element: <PasswordCreate /> },
    { path: AppRoutePaths.PASSWORD_RECOVERY, element: <PasswordRecovery /> },
    { path: AppRoutePaths.REGISTRATION, element: <Registration /> },
    {
      path: AppRoutePaths.PROFILE,
      element: (
        <AuthCheck>
          <Layout />
        </AuthCheck>
      ),
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: AppRoutePaths.EDIT_PROFILE,
          element: <EditProfile />,
        },
      ],
    },
    {
      path: AppRoutePaths.PACKS_LIST,
      element: (
        <AuthCheck>
          <Layout />
        </AuthCheck>
      ),
      children: [
        {
          index: true,
          element: <PacksList />,
        },
        {
          path: AppRoutePaths.ID_QUERY,
          element: <CardsList />,
        },
      ],
    },

    {
      path: `${AppRoutePaths.PACKS_LIST_LEARN}/${AppRoutePaths.ID_QUERY}`,
      element: (
        <AuthCheck>
          <Layout />
        </AuthCheck>
      ),
      children: [
        {
          index: true,
          element: <Learn />,
        },
      ],
    },
  ]);

  return appRoutes;
};
