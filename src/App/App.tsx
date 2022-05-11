import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "../constants/routerPaths";
import Login from "../pages/Login/Login";
import Nav from "../pages/Nav/Nav";
import NotFound from "../pages/NotFound/NotFound";
import PasswordCreate from "../pages/PasswordCreate/PasswordCreate";
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import Profile from "../pages/Profile/Profile";
import Registration from "../pages/Registration/Registration";
import TestBench from "../pages/TestBench/TestBench";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path={RoutePaths.index} element={<h2>home page</h2>} />
        <Route path={RoutePaths.random} element={<NotFound />} />
        <Route path={RoutePaths.login} element={<Login />} />
        <Route path={RoutePaths.passwordCreate} element={<PasswordCreate />} />
        <Route
          path={RoutePaths.passwordRecovery}
          element={<PasswordRecovery />}
        />
        <Route path={RoutePaths.profile} element={<Profile />} />
        <Route path={RoutePaths.registration} element={<Registration />} />
        <Route path={RoutePaths.testBench} element={<TestBench />} />
      </Routes>
    </>
  );
}

export default App;
