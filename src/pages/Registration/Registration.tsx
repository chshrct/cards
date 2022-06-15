import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { EMPTY_STRING, MAX_PASSWORD_LENGTH } from '../../constant';

import s from './Registration.module.css';

import { setError, setRegister } from 'App';
import { SuperButton, SuperInputText } from 'components';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.app.error);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setError(EMPTY_STRING));
  }, [location]);

  const formik = useFormik({
    initialValues: {
      email: EMPTY_STRING,
      password: EMPTY_STRING,
      confirmPassword: EMPTY_STRING,
    },
    validate: values => {
      const errors: Partial<FormValues> = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length <= MAX_PASSWORD_LENGTH) {
        errors.password = 'Must be 8 characters or more';
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
      } else if (values.confirmPassword.length <= MAX_PASSWORD_LENGTH) {
        errors.confirmPassword = 'Must be 8 characters or more';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'confirm password must be equal password';
      }

      return errors;
    },
    onSubmit: values => {
      dispatch(setRegister({ email: values.email, password: values.password }));
    },
  });

  const buttonDisabled =
    !!formik.errors.email ||
    !!formik.errors.password ||
    !!formik.errors.confirmPassword ||
    formik.values.email === EMPTY_STRING ||
    formik.values.password === EMPTY_STRING ||
    formik.values.confirmPassword === EMPTY_STRING;

  const navigateToLogin = (): void => navigate(AppRoutePaths.LOGIN);

  if (error === 'Created') return <Navigate to={AppRoutePaths.LOGIN} />;

  return (
    <div className={s.register}>
      <div className={s.container}>
        <h2>It-incubator</h2>
        <h3>Sign up</h3>
        <form onSubmit={formik.handleSubmit} className={s.formBlock}>
          <SuperInputText
            id="email"
            label="email"
            type="text"
            name="email"
            onChange={formik.handleChange}
            error={formik.touched.email ? formik.errors.email : EMPTY_STRING}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />

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

          <SuperInputText
            id="confirm password"
            label="confirm password"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword
                : EMPTY_STRING
            }
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
          />

          <div className={s.buttonBlock}>
            <SuperButton onClick={navigateToLogin} color="secondary" size="medium">
              Cancel
            </SuperButton>
            <SuperButton type="submit" disabled={buttonDisabled} size="large">
              Register
            </SuperButton>
          </div>
        </form>
      </div>
    </div>
  );
};
