import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fetchUserData, setUser } from "../../slices/globalSlice";
import { useDispatch } from "react-redux/es/exports";
import { getDatabase, ref, set } from "firebase/database";
import { LOGIN_ROUTE } from "../../utils/consts";

import "./registerForm.scss";
import FormInput from "../formInput/FormInput";

const RegisterForm = () => {
   const dispatch = useDispatch();

   const writeUserData = (username, id) => {
      const db = getDatabase();
      set(ref(db, "users/" + id), {
         username,
      });
      console.log("writed!");
   };

   const handleRegister = ({ username, email, password }) => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
         .then(({ user }) => {
            dispatch(setUser(user));
            writeUserData(username, user.uid);
            <Navigate to="/" />;
         })
         .catch(console.error);
   };

   return (
      <Formik
         initialValues={{
            username: "",
            email: "",
            password: "",
         }}
         validationSchema={Yup.object({
            username: Yup.string()
               .required(<p>обязательное поле</p>)
               .matches(
                  /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
                  "некорректный Логин"
               ),
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
         onSubmit={(values) => handleRegister(values)}
      >
         <Form className="register__form">
            <div className="register__header">
               <h2 className="register__title">Регистрация</h2>
            </div>
            <div className="register__body">
               <div className="register__fields">
                  <FormInput
                     id="username"
                     name="username"
                     type="text"
                     placeholder="Логин"
                  />
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
               </div>
               <div className="register__btns">
                  <button type="submit" className="register__submit">
                     Зарегистрироваться
                  </button>
                  <div className="register__login">
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
