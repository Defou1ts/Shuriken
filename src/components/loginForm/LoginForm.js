import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "../../utils/consts";
import {
   setShowLoginForm,
   setUser,
   fetchUserData,
} from "../../slices/globalSlice";
import * as Yup from "yup";

import "./loginForm.scss";
import vkIcon from "../../assets/vklogin.svg";
import facebookIcon from "../../assets/facebooklogin.svg";

import FormInput from "../formInput/FormInput";
import Spinner from "../spinner/Spinner";

const LoginForm = () => {
   const dispatch = useDispatch();
   const showLoginForm = useSelector((state) => state.global.showLoginForm);
   const [isAuthError, setIsAuthError] = useState(false);
   const [isAuthLoading, setIsAuthLoading] = useState(false);
   const location = useLocation();

   const login = ({ email, password }) => {
      const auth = getAuth();
      setIsAuthLoading(true);
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            dispatch(setShowLoginForm(false));
            setIsAuthLoading(false);
            const user = userCredential.user;
            dispatch(setUser(user));
            <Navigate to="/" />;
         })
         .catch(() => {
            setIsAuthError(true);
         });
   };

   const closeForm = (e) => {
      if (e.target.classList.contains("black-form-wrapper")) {
         dispatch(setShowLoginForm(false));
      }
   };

   useEffect(() => {
      if (location.pathname !== LOGIN_ROUTE) {
         dispatch(setShowLoginForm(false));
      }
   }, [location.pathname]);

   return (
      <div
         onClick={(e) => closeForm(e)}
         className={`black-form-wrapper ${
            showLoginForm || location.pathname === LOGIN_ROUTE ? "active" : ""
         }`}
      >
         <Formik
            initialValues={{
               email: "",
               password: "",
            }}
            validationSchema={Yup.object({
               email: Yup.string()
                  .required(<p>обязательное поле</p>)
                  .matches(
                     /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
                     "некорректный Email"
                  ),
               password: Yup.string()
                  .required(<p>обязательное поле</p>)
                  .matches(
                     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
                     "некорректный пароль"
                  ),
            })}
            onSubmit={(values) => login(values)}
         >
            <Form className="login">
               <div className="login__header">
                  <h1 className="login__title">Авторизация</h1>
               </div>
               <div className="login__social-networks">
                  <div className="login__social-network">
                     <img
                        src={vkIcon}
                        alt="login with vk"
                        className="login__social-network-logo"
                     />
                  </div>
                  <div className="login__social-network login__facebook">
                     <img
                        src={facebookIcon}
                        alt="login with facebook"
                        className="login__social-network-logo"
                     />
                  </div>
               </div>
               <div className="login__fields">
                  <FormInput
                     id="email"
                     name="email"
                     type="text"
                     placeholder="Email"
                  />
                  <FormInput
                     id="password"
                     name="password"
                     type="password"
                     placeholder="Пароль"
                  />
                  {isAuthError ? (
                     <p className="login__error">неверный логин или пароль</p>
                  ) : null}
               </div>
               <div className="login__btns">
                  {isAuthLoading ? <Spinner small /> : null}
                  <button
                     disabled={isAuthLoading}
                     type="submit"
                     className="login__submit"
                  >
                     Войти
                  </button>
                  <Link to={REGISTER_ROUTE} className="login__register">
                     Зарегистрироваться
                  </Link>
                  <a className="login__forgot">Забыли пароль?</a>
               </div>
            </Form>
         </Formik>
      </div>
   );
};

export default LoginForm;
