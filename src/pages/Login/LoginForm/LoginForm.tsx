import React from 'react';
import {ErrorMessage, Field, Form, Formik,} from 'formik';
import s from './LoginForm.module.css';
import SuperButton from '../../../components/shared/SuperButton/SuperButton';
import {useAppDispatch} from '../../../store/store';
import {login} from '../loginReducer';


export const LoginForm = () => {

    const dispatch = useAppDispatch()

    const initialValues = {email: '', password: '', rememberMe: false}

  return (
    <div>
        <div>
        <Formik
        initialValues={initialValues}
        validate={values => {
            const errors = {} as { email: string, password: string };
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if (values.email.length >= 30) {
                errors.email = 'Too long email';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = "Must be longer than 7 characters"
            }
            return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
            dispatch(login(values.email, values.password, values.rememberMe))
            setSubmitting(false);
        }}
        >
        {({
              status
          }) => (
            <Form>
                <div>
                    <Field placeholder={"login"} type="email" name="email" className={s.input}/>
                </div>
                <ErrorMessage name="email" component="div" className={s.errorMessage}/>
                <div>
                    <Field placeholder={"password"} type="password" name="password" className={s.input}/>
                </div>
                <ErrorMessage name="password" component="div" className={s.errorMessage}/>
                <div>
                    <div className={s.errorMessage}>{status}</div>
                    <Field type={'checkbox'} name={'rememberMe'}/>
                    <label htmlFor={'rememberMe'}> remember me </label>
                </div>
                <SuperButton type="submit">Login</SuperButton>
            </Form>
        )}
        </Formik>
        </div>
    </div>
  );
};
