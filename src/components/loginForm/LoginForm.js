import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts';
import { setShowLoginForm } from '../../slices/globalSlice';
import { useUserService } from '../../services/firebase/user.service';
import * as Yup from 'yup';

import './loginForm.scss';
import vkIcon from '../../assets/vklogin.svg';
import facebookIcon from '../../assets/facebooklogin.svg';

import FormInput from '../formInput/FormInput';
import Spinner from '../spinner/Spinner';

const LoginForm = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const authLoadingStatus = useSelector(
        state => state.global.authLoadingStatus
    );
    const showLoginForm = useSelector(state => state.global.showLoginForm);

    const { login } = useUserService();

    const closeForm = e => {
        if (
            e.target.classList.contains('black-form-wrapper') &&
            location.pathname !== LOGIN_ROUTE
        ) {
            dispatch(setShowLoginForm(false));
        }
    };

    return (
        <div
            onClick={e => closeForm(e)}
            className={`black-form-wrapper ${
                showLoginForm || location.pathname === LOGIN_ROUTE
                    ? 'active'
                    : ''
            }`}
        >
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .required(<p>обязательное поле</p>)
                        .matches(
                            /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                            'некорректный Email'
                        ),
                    password: Yup.string()
                        .required(<p>обязательное поле</p>)
                        .matches(
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                            'некорректный пароль'
                        ),
                })}
                onSubmit={values => login(values)}
            >
                <Form className='login'>
                    <div className='login__header'>
                        <h1 className='login__title'>Авторизация</h1>
                    </div>
                    <div className='login__social-networks'>
                        <div className='login__social-network'>
                            <img
                                src={vkIcon}
                                alt='login with vk'
                                className='login__social-network-logo'
                            />
                        </div>
                        <div className='login__social-network login__facebook'>
                            <img
                                src={facebookIcon}
                                alt='login with facebook'
                                className='login__social-network-logo'
                            />
                        </div>
                    </div>
                    <div className='login__fields'>
                        <FormInput
                            id='email'
                            name='email'
                            type='text'
                            placeholder='Email'
                        />
                        <FormInput
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Пароль'
                        />
                        {authLoadingStatus === 'error' ? (
                            <p className='login__error'>
                                неверный логин или пароль
                            </p>
                        ) : null}
                    </div>
                    <div className='login__btns'>
                        {authLoadingStatus === 'loading' ? (
                            <Spinner small />
                        ) : null}
                        <button
                            disabled={authLoadingStatus === 'loading'}
                            type='submit'
                            className='login__submit'
                        >
                            Войти
                        </button>
                        <Link
                            to={REGISTER_ROUTE}
                            className='login__register'
                        >
                            Зарегистрироваться
                        </Link>
                        <Link className='login__forgot'>Забыли пароль?</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginForm;
