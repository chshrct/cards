import React, { useState } from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink } from 'react-router-dom';

import { MAX_PASSWORD_LENGTH } from '../../../constant';
import { RoutePaths } from '../../../constants/routePaths';
import viewOp from '../../Registration/view.png';
import viewCl from '../../Registration/viewClose.png';
import { login } from '../loginReducer';

import s from './LoginForm.module.css';

import { SuperButton } from 'components';
import { useAppDispatch } from 'store';

export const LoginForm: React.FC = () => {
  const viewOpen = {
    backgroundImage: `url(${viewOp})`,
  };

  const viewClose = {
    backgroundImage: `url(${viewCl})`,
  };

  const [view, setView] = useState(false);

  const dispatch = useAppDispatch();

  const initialValues = { email: '', password: '', rememberMe: false };

  const changeView = (): void => setView(!view);

  const emailLength = 30;
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={values => {
          const errors = {} as { email: string; password: string };
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          } else if (values.email.length >= emailLength) {
            errors.email = 'Too long email';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length <= MAX_PASSWORD_LENGTH) {
            errors.password = 'Must be longer than 7 characters';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values.email, values.password, values.rememberMe));
          setSubmitting(false);
        }}
      >
        {({ status }) => (
          <Form className={s.formWrapper}>
            <div>
              <Field placeholder="login" type="email" name="email" className={s.input} />
              <hr className={s.hr} />
            </div>
            <ErrorMessage name="email" component="div" className={s.errorMessage} />
            <div className={s.showPassword}>
              <Field
                placeholder="password"
                type={view ? 'text' : 'password'}
                name="password"
                className={s.input}
              />
              <div
                role="none"
                className={s.icon}
                style={view ? viewOpen : viewClose}
                onClick={changeView}
              />
            </div>
            <hr className={s.hr} />
            <ErrorMessage name="password" component="div" className={s.errorMessage} />
            <div className={s.remember}>
              <div>{status}</div>
              <Field className={s.checkbox} type="checkbox" name="rememberMe" />
              <span> remember me </span>
            </div>
            <div className={s.forgotPassword}>
              <NavLink to={RoutePaths.passwordRecovery}>Forgot Password</NavLink>
            </div>
            <SuperButton type="submit" className={s.loginButton}>
              Login
            </SuperButton>
            <span>Don`&apos;`t have an account?</span>
            <NavLink to={RoutePaths.registration}>Sign Up</NavLink>
          </Form>
        )}
      </Formik>
    </div>
  );
};
