import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RoutePaths } from "../constants/routePaths";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import PasswordCreate from "../pages/PasswordCreate/PasswordCreate";
import PasswordRecovery from "../pages/PasswordRecovery/PasswordRecovery";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile/EditProfile"
import Registration from "../pages/Registration/Registration";
import TestBench from "../pages/TestBench/TestBench";
import "./App.css";
import Layout from "../components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path={RoutePaths.index} element={<Layout />}>
          <Route index element={<h2>home page</h2>} />
          <Route
            path={RoutePaths.random}
            element={<Navigate to={RoutePaths.notFound} />}
          />
          <Route path={RoutePaths.notFound} element={<NotFound />} />
          <Route path={RoutePaths.login} element={<Login />} />
          <Route
            path={RoutePaths.passwordCreate}
            element={<PasswordCreate />}
          />
          <Route
            path={RoutePaths.passwordRecovery}
            element={<PasswordRecovery />}
          />
          <Route path={RoutePaths.profile} element={<Profile />} />
          <Route path={RoutePaths.editProfile} element={<EditProfile />} />
          <Route path={RoutePaths.registration} element={<Registration />} />
          <Route path={RoutePaths.testBench} element={<TestBench />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
