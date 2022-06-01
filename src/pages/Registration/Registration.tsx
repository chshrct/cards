import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import s from './Registration.module.css';
import viewOp from './view.png';
import viewCl from './viewClose.png';

import { SuperButton } from 'components';
import { MAX_PASSWORD_LENGTH } from 'constant';
import { setError, setRegister } from 'pages';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const Registration: React.FC = () => {
  const viewOpen = {
    backgroundImage: `url(${viewOp})`,
  };

  const viewClose = {
    backgroundImage: `url(${viewCl})`,
  };

  const [view, setView] = useState(false);

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

  const changeView = (): void => setView(!view);
  const navigateToLogin = (): void => navigate(AppRoutePaths.LOGIN);

  if (error === 'Created') return <Navigate to={AppRoutePaths.LOGIN} />;

  return (
    <div className={s.register}>
      <div className={s.container}>
        <h2>It-incubator</h2>
        <h3>Sign up</h3>
        <form onSubmit={formik.handleSubmit} className={s.formBlock}>
          <input
            className={s.input}
            placeholder="email"
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : (
            <div />
          )}

          <div className={s.passBlock}>
            <input
              className={s.input}
              placeholder="password"
              type={view ? 'text' : 'password'}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div
              role="none"
              className={s.icon}
              style={view ? viewOpen : viewClose}
              onClick={changeView}
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : (
            <div />
          )}

          <div className={s.passBlock}>
            <input
              className={s.input}
              placeholder="confirm password"
              type={view ? 'text' : 'password'}
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <div
              role="none"
              className={s.icon}
              style={view ? viewOpen : viewClose}
              onClick={changeView}
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : (
            <div />
          )}

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
