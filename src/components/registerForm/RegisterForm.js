import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useUserService } from '../../services/firebase/user.service';

import './registerForm.scss';
import FormInput from '../formInput/FormInput';

const RegisterForm = () => {
    const { register } = useUserService();

    const handleRegister = async values => {
        register(values);
    };

    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .required(<p>обязательное поле</p>)
                    .matches(
                        // eslint-disable-next-line
                        /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
                        'некорректный Логин'
                    ),
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
            onSubmit={values => handleRegister(values)}
        >
            <Form className='register__form'>
                <div className='register__header'>
                    <h2 className='register__title'>Регистрация</h2>
                </div>
                <div className='register__body'>
                    <div className='register__fields'>
                        <FormInput
                            id='username'
                            name='username'
                            type='text'
                            placeholder='Логин'
                        />
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
                    </div>
                    <div className='register__btns'>
                        <button
                            type='submit'
                            className='register__submit'
                        >
                            Зарегистрироваться
                        </button>
                        <div className='register__login'>
                            <span>Есть аккаунт? </span>
                            <Link to={LOGIN_ROUTE}>Войти</Link>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default RegisterForm;
