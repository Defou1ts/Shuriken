import { useField } from "formik";

const FormInput = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
      <>
         {label ? (
            <label className="login__label" htmlFor={props.name}>
               {label}
            </label>
         ) : null}
         <input className="login__input" {...props} {...field} />
         {meta.touched && meta.error ? (
            <div className="login__error">{meta.error}</div>
         ) : null}
      </>
   );
};

export default FormInput;
