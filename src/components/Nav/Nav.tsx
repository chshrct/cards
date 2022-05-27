import React from "react";
import { NavLink } from "react-router-dom";
import { RoutePaths } from "../../constants/routerPaths";
import s from "./Nav.module.css";

const Nav = () => {
  return (
    <>
      <div>
        <h2>Navigation</h2>
        <nav className={s.nav}>
          <NavLink to={RoutePaths.index}>Home</NavLink>
          <NavLink to={RoutePaths.login}>Login</NavLink>
          <NavLink to={RoutePaths.notFound}>404</NavLink>
          <NavLink to={RoutePaths.passwordCreate}>Password create</NavLink>
          <NavLink to={RoutePaths.passwordRecovery}>Password recovery</NavLink>
          <NavLink to={RoutePaths.profile}>Profile</NavLink>
          <NavLink to={RoutePaths.registration}>Registration</NavLink>
          <NavLink to={RoutePaths.testBench}>Test bench</NavLink>
        </nav>
      </div>
    </>
  );
};

export default Nav;