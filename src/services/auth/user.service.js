import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import {
    setAuthLoadingStatus,
    setShowLoginForm,
    setRegisterLoadingStatus,
    setRegisterErrorMessage,
    setUser,
    setWriteLoadingStatus,
    setFileLoadingStatus,
} from '../../slices/globalSlice';
import { Navigate } from 'react-router-dom';
import { ERROR, IDLE, LOADING, SUCCESS } from '../../utils/consts';

export const useUserService = () => {
    const apiBase = 'http://localhost:8000';

    const { request } = useHttp();
    const dispatch = useDispatch();

    const login = async ({ email, password }) => {
        dispatch(setAuthLoadingStatus(LOADING));
        const res = await request(`${apiBase}/auth/login`, 'POST', {
            email,
            password,
        });
        if (res.error) {
            dispatch(setAuthLoadingStatus(ERROR));
            return;
        }
        localStorage.setItem('access_token', res.access_token);
        dispatch(setShowLoginForm(false));
        dispatch(setAuthLoadingStatus('idle'));
        const user = await getUser();
        dispatch(setUser(user));
    };

    const register = async ({ username, email, password }) => {
        dispatch(setRegisterLoadingStatus(LOADING));
        const res = await request(`${apiBase}/auth/register`, 'POST', {
            username,
            email,
            password,
        });
        if (res.error) {
            dispatch(setRegisterErrorMessage(res.message));
            return;
        }
        dispatch(setRegisterLoadingStatus(IDLE));
        dispatch(setUser(res));
        await login({ email, password });
        <Navigate to="/" />;
    };

    const exit = () => {
        dispatch(setUser(null));
        localStorage.removeItem('access_token');
    };

    const getUser = async () => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            const res = await request(`${apiBase}/auth/user`, 'GET', null, {
                Authorization: `Bearer ${access_token}`,
            });
            return res;
        }
    };

    const addToUserNotes = async (note, anime) => {
        dispatch(setWriteLoadingStatus(LOADING));
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            dispatch(setWriteLoadingStatus(ERROR));
            return;
        }
        const res = await request(
            `${apiBase}/auth/notes/add`,
            'POST',
            {
                note,
                animeId: Number(anime.id),
                anime,
            },
            {
                Authorization: `Bearer ${access_token}`,
            }
        );
        if (res.error) {
            dispatch(setWriteLoadingStatus(ERROR));
            return;
        }
        dispatch(setUser(res));
        dispatch(setWriteLoadingStatus(IDLE));
    };

    const uploadUserImage = async (multipartFormFile) => {
        dispatch(setFileLoadingStatus(LOADING));
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            dispatch(setFileLoadingStatus(ERROR));
            return;
        }
        const res = await request(
            `${apiBase}/files/uploadUserImage`,
            'POST',
            {
                body: multipartFormFile,
            },
            {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            }
        );
        if (res.error) {
            dispatch(setFileLoadingStatus(ERROR));
            return;
        }
        if (res.username) {
            dispatch(setUser(res));
            dispatch(setFileLoadingStatus(SUCCESS));
        }
        setTimeout(() => {
            dispatch(setFileLoadingStatus(IDLE));
        }, 1000);
    };

    return {
        login,
        getUser,
        register,
        exit,
        addToUserNotes,
        uploadUserImage,
    };
};
