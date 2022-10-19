import { Formik, Form } from 'formik';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';

import './loginForm.scss';

import vkIcon from '../../assets/vklogin.svg';
import facebookIcon from '../../assets/facebooklogin.svg';

import LoginInput from '../loginInput/LoginInput';

const LoginForm = () => {

   const navigate = useNavigate()
   const [isAuthError, setIsAuthError] = useState(false);

   const login = ({ email, password }) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
         .then(() => {
            navigate('/')
         })
         .catch(() => {
            setIsAuthError(true)
         });
   }

   return (
      <div className="black-form-wrapper">
         <Formik
            initialValues={{
               email: '',
               password: '',
            }}
            validationSchema={Yup.object({
               email: Yup.string()
                  .required(<p>обязательное поле</p>)
                  .matches(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, 'некорректный Email'),
               password: Yup.string()
                  .required(<p>обязательное поле</p>)
                  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/, 'некорректный пароль')
            })}
            onSubmit={values => login(values)}
         >
            <Form className='login'>
               <div className="login__header">
                  <h1 className="login__title">Авторизация</h1>
               </div>
               <div className="login__social-networks">
                  <div className="login__social-network">
                     <img src={vkIcon} alt="login with vk" className="login__social-network-logo" />
                  </div>
                  <div className="login__social-network">
                     <img src={facebookIcon} alt="login with facebook" className="login__social-network-logo" />
                  </div>
               </div>
               <div className="login__fields">
                  <LoginInput
                     id="email"
                     name="email"
                     type="text"
                     placeholder="Email"
                  />
                  <LoginInput
                     id="password"
                     name="password"
                     type="password"
                     placeholder="Пароль"
                  />
                  {isAuthError ?
                     (
                        <p className="login__error">неверный логин или пароль</p>
                     )
                     : null}
               </div>
               <div className="login__btns">
                  <button type='submit' className="login__submit">Войти</button>
                  <a className="login__register">Зарегистрироваться</a>
                  <a className="login__forgot">Забыли пароль?</a>
               </div>
            </Form>
         </Formik>
      </div>
   )
}

export default LoginForm;