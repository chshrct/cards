import React, { FC } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from 'components';
import { RoutePaths } from 'constant';
import {
  Login,
  NotFound,
  PasswordCreate,
  PasswordRecovery,
  Profile,
  Registration,
  TestBench,
} from 'pages';

import './App.css';

const App: FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.index} element={<Layout />}>
        <Route index element={<h2>home page</h2>} />
        <Route path={RoutePaths.random} element={<Navigate to={RoutePaths.notFound} />} />
        <Route path={RoutePaths.notFound} element={<NotFound />} />
        <Route path={RoutePaths.login} element={<Login />} />
        <Route path={RoutePaths.passwordCreate} element={<PasswordCreate />} />
        <Route path={RoutePaths.passwordRecovery} element={<PasswordRecovery />} />
        <Route path={RoutePaths.profile} element={<Profile />} />
        <Route path={RoutePaths.registration} element={<Registration />} />
        <Route path={RoutePaths.testBench} element={<TestBench />} />
      </Route>
    </Routes>
  );
};

export default App;
