import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import {
    setUser,
    setAuthLoadingStatus,
    setRegisterLoadingStatus,
} from '../../slices/globalSlice';
import { setShowLoginForm } from '../../slices/globalSlice';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useUserService = () => {
    const dispatch = useDispatch();

    const login = ({ email, password }) => {
        const auth = getAuth();
        dispatch(setAuthLoadingStatus('loading'));
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(setShowLoginForm(false));
                dispatch(setAuthLoadingStatus('idle'));
                const user = userCredential.user;
                dispatch(setUser(user));
                <Navigate to='/' />;
            })
            .catch(() => {
                dispatch(setAuthLoadingStatus('error'));
            });
    };

    const register = ({ username, email, password }) => {
        const auth = getAuth();
        dispatch(setRegisterLoadingStatus('loading'));
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setRegisterLoadingStatus('idle'));
                dispatch(setUser(user));
                writeUserData('username', username, user.uid);
                <Navigate to='/' />;
            })
            .catch(() => {
                dispatch(setRegisterLoadingStatus('error'));
            });
    };

    const writeUserData = (key, value, id) => {
        const db = getDatabase();
        set(ref(db, 'users/' + id), {
            [key]: value,
        });
    };

    return {
        login,
        register,
    };
};
