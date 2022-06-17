import React from 'react';

import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { loginUser } from '../../../App/auth/authReducer';
import { EMPTY_STRING } from '../../../constant';
import { validateEmail, validatePassword } from '../../../helpers';

import s from './LoginForm.module.css';

import { SuperButton, SuperCheckbox, SuperInputText } from 'components';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

type ValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm: React.FC = () => {
  const isLoading = useAppSelector(state => state.app.isLoading);
  const error = useAppSelector(state => state.auth.error);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { email: EMPTY_STRING, password: EMPTY_STRING, rememberMe: false },
    onSubmit: (values: ValuesType) => {
      dispatch(loginUser(values.email, values.password, values.rememberMe));
    },
    validate: (values: ValuesType) => {
      const errors = {} as ValuesType;

      if (validateEmail(values.email)) errors.email = validateEmail(values.email);
      if (validatePassword(values.password))
        errors.password = validatePassword(values.password);

      return errors;
    },
  });
  const buttonDisabled =
    !!formik.errors.email ||
    !!formik.errors.password ||
    formik.values.email === EMPTY_STRING ||
    formik.values.password === EMPTY_STRING;

  return (
    <form onSubmit={formik.handleSubmit} className={s.formWrapper}>
      <div className={s.input}>
        <SuperInputText
          id="email"
          label="Email"
          type="text"
          name="email"
          onChange={formik.handleChange}
          error={formik.touched.email ? formik.errors.email : EMPTY_STRING}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          disabled={isLoading}
          autoFocus
        />
      </div>
      <div className={s.input}>
        <SuperInputText
          id="password"
          label="password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          error={formik.touched.password ? formik.errors.password : EMPTY_STRING}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className={s.remember}>
        <SuperCheckbox
          onChange={formik.handleChange}
          checked={formik.values.rememberMe}
          className={s.checkbox}
          type="checkbox"
          name="rememberMe"
        />
        <span> Remember me </span>
      </div>
      <div className={s.forgotPassword}>
        <NavLink to={AppRoutePaths.PASSWORD_RECOVERY} className={s.forgotPasswordLink}>
          Forgot Password
        </NavLink>
      </div>
      <div className={s.loginButton}>
        <SuperButton type="submit" disabled={buttonDisabled} size="large">
          Login
        </SuperButton>
      </div>
      <span className={s.error}>{error}</span>
      <span className={s.tip}>Don&apos;t have an account?</span>
      <div className={s.signUp}>
        <NavLink to={AppRoutePaths.REGISTRATION}>Sign Up</NavLink>
      </div>
    </form>
  );
};
