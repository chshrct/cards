import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {RoutePaths} from '../../constants/routePaths';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {setError, setRegister} from './registrationReducer';
import s from './Registration.module.css'

type FormValues = {
    email: string
    password: string
    confirmPassword: string
}

const Registration = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.registration.error)

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        dispatch(setError(''))
    }, [location])

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
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword.length < 2) {
                errors.confirmPassword = 'Must be 8 characters or more';
            }else if(values.password !== values.confirmPassword){
                errors.confirmPassword = 'confirm password must be equal password';
            }


            return errors;
        },
        onSubmit: values => {
            dispatch(setRegister({email: values.email, password: values.password}))
            // formik.resetForm()
            // alert(JSON.stringify(values, null, 2));
        },
    });

    const navigateToLogin = () => {
        navigate(`../${RoutePaths.login}`, {replace: true})
    }

    if (error === 'Created') {
        return <Navigate to={`../${RoutePaths.login}`} replace={true}/>
    }

    return (
        <div>
            <h2>Registration</h2>
            <h3>Sign up</h3>
            <h1>{error}</h1>
            <form onSubmit={formik.handleSubmit} className={s.formBlock}>
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

                <input placeholder={'confirm password'}
                       type="password"
                       {...formik.getFieldProps('confirmPassword')}/>
                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div>{formik.errors.confirmPassword}</div>}

                <button onClick={navigateToLogin}>return to Login</button>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;
