import {useFormik} from 'formik';
import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {RoutePaths} from '../../constants/routePaths';

type FormValues = {
    email: string
    password: string
    confirmPassword: string
}

const Registration = () => {

    const navigate = useNavigate()

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
            } else if (values.password.length > 15) {
                errors.password = 'Must be 15 characters or less';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword.length > 15) {
                errors.confirmPassword = 'Must be 15 characters or less';
            }


            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const navigateToLogin = () => {

        navigate(RoutePaths.login)
    }


    return (
        <div>
            <h2>Registration</h2>
            <h3>Sign up</h3>
            <form onSubmit={formik.handleSubmit}>
                <input placeholder={'email'}
                       type="text"
                       {...formik.getFieldProps('email')}/>
                {formik.touched.email && formik.errors.email &&
                    <div>{formik.errors.email}</div>}

                <input placeholder={'password'}
                       type="password"
                       {...formik.getFieldProps('password')}/>
                {formik.touched.password && formik.errors.password &&
                    <div>{formik.errors.password}</div>}

                <input placeholder={'confirmPassword'}
                       type="password"
                       {...formik.getFieldProps('confirmPassword')}/>
                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div>{formik.errors.confirmPassword}</div>}

                <button onClick={navigateToLogin}>Login</button>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;
