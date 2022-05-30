import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {RoutePaths} from '../../constants/routePaths';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {setError, setRegister} from './registrationReducer';
import s from './Registration.module.css'
import viewOp from '../../pages/Registration/view.png'
import viewCl from '../../pages/Registration/viewClose.png'
import SuperButton from '../../components/shared/SuperButton/SuperButton';

type FormValues = {
    email: string
    password: string
    confirmPassword: string
}

const Registration = () => {

    const viewOpen = {
        backgroundImage: `url(${viewOp})`,
    };

    const viewClose = {
        backgroundImage: `url(${viewCl})`,
    };

    const [view, setView] = useState(false)

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
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'confirm password must be equal password';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(setRegister({email: values.email, password: values.password}))
        },
    });

    const changeView = () => setView(!view)
    const navigateToLogin = () => navigate(RoutePaths.login)

    if (error === 'Created') return <Navigate to={RoutePaths.login}/>

    return (
        <div className={s.register}>
            <div className={s.container}>
                <h2>It-incubator</h2>
                <h3>Sign up</h3>
                <form onSubmit={formik.handleSubmit} className={s.formBlock}>
                    <input className={s.input} placeholder={'email'}
                           type="text"
                           {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email ?
                        <div>{formik.errors.email}</div> : <div/>}

                    <div className={s.passBlock}>
                        <input className={s.input} placeholder={'password'}
                               type={view ? 'text' : 'password'}
                               {...formik.getFieldProps('password')}/>
                        <div className={s.icon}
                             style={view ? viewOpen : viewClose}
                             onClick={changeView}/>
                    </div>
                    {formik.touched.password && formik.errors.password ?
                        <div>{formik.errors.password}</div> : <div/>}

                    <div className={s.passBlock}>
                        <input className={s.input} placeholder={'confirm password'}
                               type={view ? 'text' : 'password'}
                               {...formik.getFieldProps('confirmPassword')}/>
                        <div className={s.icon}
                             style={view ? viewOpen : viewClose}
                             onClick={changeView}/>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div>{formik.errors.confirmPassword}</div> : <div/>}

                    <div className={s.buttonBlock}>
                        <SuperButton className={s.buttonLog}
                                     onClick={navigateToLogin}>
                            back to Login
                        </SuperButton>
                        <SuperButton className={s.buttonReg}
                                     type="submit">
                            Register
                        </SuperButton>
                    </div>
                </form>
                <span>{error}</span>
            </div>
        </div>
    );
};

export default Registration;
