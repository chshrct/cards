import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik,} from 'formik';
import s from './LoginForm.module.css';
import SuperButton from '../../../components/shared/SuperButton/SuperButton';
import {useAppDispatch} from '../../../store/store';
import {login} from '../loginReducer';
import eye from './eye.png'


export const LoginForm = () => {

    const dispatch = useAppDispatch()

    const initialValues = {email: '', password: '', rememberMe: false}
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const finalPasswordType = isVisible ? "text": "password"

    const showPassword = () => {
        setIsVisible(!isVisible)
    }

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
                <div >
                    <Field placeholder={"login"} type="email" name="email" className={s.input}/>
                    <hr className={s.hr}/>
                </div>
                <ErrorMessage name="email" component="div" className={s.errorMessage}/>
                <div className={s.showPassword}>
                    <Field placeholder={"password"} type={finalPasswordType} name="password" className={s.input}/>
                    <img onClick={showPassword} className={s.eye} src={eye} alt=""/>
                </div>
                <hr className={s.hr}/>
                <ErrorMessage name="password" component="div" className={s.errorMessage}/>
                <div className={s.remember}>
                    <div>{status}</div>
                    <Field className={s.checkbox} type={'checkbox'} name={'rememberMe'}/>
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
