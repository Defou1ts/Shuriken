import { useField } from 'formik';
import { useSelector } from 'react-redux';
import { useLog } from '../../../services/logService/log.service';

const FormInput = ({ label, form, ...props }) => {
    const registerErrorMessage = useSelector(
        state => state.global.registerErrorMessage
    );
    const { logErrorMessage } = useLog();
    const { message, type, formType } = logErrorMessage(registerErrorMessage);
    const [field, meta] = useField(props);
    return (
        <>
            {label ? (
                <label
                    className='login__label'
                    htmlFor={props.name}
                >
                    {label}
                </label>
            ) : null}
            <input
                className='login__input'
                {...props}
                {...field}
            />
            {meta.touched && meta.error ? (
                <div className='login__error'>{meta.error}</div>
            ) : null}
            {meta.touched &&
            message &&
            type === props.name &&
            form === formType ? (
                <div className='login__error'>{message}</div>
            ) : null}
        </>
    );
};

export default FormInput;
