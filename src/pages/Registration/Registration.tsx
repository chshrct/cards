import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { MAX_PASSWORD_LENGTH } from '../../constant';

import s from './Registration.module.css';

import { SuperButton, SuperInputText } from 'components';
import { setError, setRegister } from 'pages';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Registration: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(state => state.registration.error);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(setError(''));
  }, [location]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
            error={formik.errors.email}
            // value={formik.values.email}
            // onBlur={formik.handleBlur}
            // touched={formik.touched.email}
          />

          <SuperInputText
            id="password"
            label="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            error={formik.errors.password}
            // value={formik.values.password}
            // onBlur={formik.handleBlur}
            // touched={formik.touched.password}
          />

          <SuperInputText
            id="confirm password"
            label="confirm password"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
            // value={formik.values.confirmPassword}
            // onBlur={formik.handleBlur}
            // touched={formik.touched.confirmPassword}
          />

          <div className={s.buttonBlock}>
            <SuperButton className={s.buttonLog} onClick={navigateToLogin}>
              back to Login
            </SuperButton>
            <SuperButton className={s.buttonReg} type="submit">
              Register
            </SuperButton>
          </div>
        </form>
        <span>{error}</span>
      </div>
    </div>
  );
};
