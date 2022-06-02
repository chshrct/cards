import React from 'react';

import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

import { EMPTY_STRING } from '../../../constant';
import { validateEmail, validatePassword } from '../../../helpers';
import { loginUser } from '../loginReducer';

import s from './LoginForm.module.css';

import {
  SuperButton,
  SuperCheckbox,
  SuperInputPassword,
  SuperInputText,
} from 'components';
import { AppRoutePaths } from 'routes';
import { useAppDispatch } from 'store';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: { email: '', password: '', rememberMe: false },
    onSubmit: (values: any) => {
      // eslint-disable-next-line no-debugger
      debugger;
      dispatch(loginUser(values.email, values.password, values.rememberMe));
    },
    validate: (values: any) => {
      const errors = {} as any;
      errors.email = validateEmail(values.email);
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
    <div>
      <form onSubmit={formik.handleSubmit} className={s.formWrapper}>
        <SuperInputText
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          error={formik.errors.email}
          label="Email"
          id="Email"
        />
        <SuperInputPassword
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          name="password"
          error={formik.errors.password}
        />
        <div className={s.remember}>
          <SuperCheckbox
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
            className={s.checkbox}
            type="checkbox"
            name="rememberMe"
          />
          <span> remember me </span>
        </div>
        <div className={s.forgotPassword}>
          <NavLink to={AppRoutePaths.PASSWORD_RECOVERY}>Forgot Password</NavLink>
        </div>
        <SuperButton disabled={buttonDisabled}>Login</SuperButton>
        <span>Don&apos;t have an account?</span>
        <NavLink to={AppRoutePaths.REGISTRATION}>Sign Up</NavLink>
      </form>
    </div>
  );
};
