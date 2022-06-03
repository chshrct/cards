import React from 'react';

import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { EMPTY_STRING } from '../../../constant';
import { validateEmail, validatePassword } from '../../../helpers';
import { loginUser } from '../loginReducer';

import s from './LoginForm.module.css';

import { SuperButton, SuperCheckbox, SuperInputText } from 'components';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

type FormikValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const LoginForm: React.FC = () => {
  const error = useAppSelector(state => state.login.error);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
    onSubmit: (values: FormikValuesType) => {
      dispatch(loginUser(values.email, values.password, values.rememberMe));
    },
    validate: (values: FormikValuesType) => {
      const errors = {} as FormikValuesType;
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
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          error={formik.touched.email ? formik.errors.email : ''}
          label="Email"
          id="Email"
          onBlur={formik.handleBlur}
        />
      </div>
      <div className={s.input}>
        <SuperInputText
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          name="password"
          label="Password"
          id="Password"
          error={formik.touched.password ? formik.errors.password : ''}
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
        <span>remember me</span>
      </div>
      <div className={s.forgotPassword}>
        <NavLink to={AppRoutePaths.PASSWORD_RECOVERY}>Forgot Password</NavLink>
      </div>
      <div className={s.loginButton}>
        <SuperButton type="submit" disabled={buttonDisabled} size="large">
          Login
        </SuperButton>
      </div>
      <span className={s.error}>{error}</span>
      <span>Don&apos;t have an account?</span>
      <div className={s.signUp}>
        <NavLink to={AppRoutePaths.REGISTRATION}>Sign Up</NavLink>
      </div>
    </form>
  );
};
